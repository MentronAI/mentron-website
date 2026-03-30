const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const os = require('os');

const crypto = require('crypto');

const { execSync } = require('child_process');

const BROWSER_DATA_DIR = path.join(__dirname, '../../../storage/browser-data');
const COOKIES_PATH = path.join(BROWSER_DATA_DIR, 'cookies.json');

// Ensure browser-data directory exists
if (!fs.existsSync(BROWSER_DATA_DIR)) {
  fs.mkdirSync(BROWSER_DATA_DIR, { recursive: true });
}

// Store state for the browser and page
let browser = null;
let page = null;

let cookies = [];

// Load cookies if they exist
if (fs.existsSync(COOKIES_PATH)) {
  try {
    const data = fs.readFileSync(COOKIES_PATH, 'utf8');
    cookies = JSON.parse(data);
    console.error('Loaded cookies from cookies.json');
  } catch (e) {
    console.error('Error loading cookies:', e.message);
  }
}

// Check if user is logged in by checking for user menu or profile elements
async function checkLoginStatus(page) {
  try {
    // Check for user menu or profile elements that indicate logged-in state
    const userMenu = await page.$('[data-testid="user-menu-toggle"]').first();
    const profileElement = await page.$('[data-testid="user-profile-component"]').first();

    return !!(userMenu || profileElement);
  } catch (e) {
    return false;
  }
}

// Launch browser and navigate to Perplexity
async function launchBrowser() {
  if (browser) {
    return { browser, page };
  }

  browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'],
  });

  const context = browser.newContext();
  page = await context.newPage();

  // Load cookies
  if (cookies.length > 0) {
    const domain = 'perplexity.ai';
    await context.addCookies(cookies.map(c => ({ ...c, domain }));
    console.error(`Loaded ${cookies.length} cookies for ${domain}`);
  }

  await page.goto('https://www.perplexity.ai/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Check if already logged in
  const isLoggedIn = await checkLoginStatus(page);
  if (!isLoggedIn) {
    console.error('User not logged in. Please run perplexity_login first.');
    throw new Error('Not logged in to Perplexity. Run perplexity_login first.');
  }

  return { browser, page };
}

// Get the current page (launch if needed)
async function getCurrentPage() {
  if (!browser || !page) {
    return launchBrowser();
  }
  return { browser, page };
}

// Wait for response to complete
async function waitForResponse(page, timeout = 120000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    // Check if we're still generating (look for stop button or generating indicator)
    const stopButton = await page.$('[data-testid="stop-generating"]').first();
    if (stopButton) {
      // Wait for it to disappear
      await page.waitForTimeout(1000);
      const stillGenerating = await page.$('[data-testid="stop-generating"]').first();
      if (!stillGenerating) {
        return true;
      }
    }

    // Check for response content
    const responseContent = await page.$('[data-testid="response-content"]').first();
    if (responseContent) {
      return true;
    }

    await page.waitForTimeout(500);
  }

  return false;
}
// MCP Tool: perplexity_paste
server.setRequestHandler('perplexity_paste', async (req, res) => {
  const { content, submit = true } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const { browser, page } = await getCurrentPage();

    // Find the input box
    const inputBox = await page.$('#ask-input[contenteditable="true"]').first();
    if (!inputBox) {
      return res.status(500).json({ error: 'Input box not found' });
  }

    // Click to focus the input box
    await inputBox.click();

    // Use clipboard API to paste content
    // This is much faster than typing character by character
    await inputBox.evaluate((el, content) => {
      // Focus the element
      el.focus();

      // Use execCommand to paste (modern approach)
      const success = await document.execCommand('paste');
      if (success) {
        // If paste command worked, we're done
        return;
      }

      // Fallback: manually set the value
      // First select all
      await el.evaluate(() => {
        const selection = window.getSelection();
        const range = document.createRange();
        const element = document.querySelector('#ask-input[contenteditable="true"]');
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      });

      // Insert content at cursor position
      await el.evaluate((el, content) => {
        // Insert content at cursor position
        document.execCommand('insertText', false, content);
      }, content);
    }, content);

    // Submit if requested
    if (submit) {
      // Find and click the submit button
      const submitButton = await page.$('[data-testid="submit-button"]').first();
      if (submitButton) {
        await submitButton.click();
        await waitForResponse(page);
      } else {
        // Try pressing Enter as fallback
        await inputBox.press('Enter');
      }
    }

    res.json({
      success: true,
      message: `Content pasted and ${submit ? 'submitted' : 'added to input'}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MCP Tool: perplexity_copy_response
server.setRequestHandler('perplexity_copy_response', async (req, res) => {
  const { codeBlockIndex } = req.body

  try {
    const { browser, page } = await getCurrentPage();

    // Wait for response to complete if needed
    await waitForResponse(page);

    // Find the response container
    const responseContainer = await page.$('[data-testid="response-content"]').first();
    if (!responseContainer) {
    return res.status(500).json({ error: 'Response container not found' });
  }

    let content;
    if (codeBlockIndex !== undefined) {
      // Copy entire response
      content = await responseContainer.innerText();
    } else {
      // Copy specific code block
      const codeBlocks = await responseContainer.$$('pre, code');
      if (codeBlockIndex < 0 || codeBlockIndex >= codeBlocks.length) {
        return res.status(400).json({ error: `Code block index ${codeBlockIndex} out of range` });
      }
      content = await codeBlocks[codeBlockIndex].innerText();
    }

    // Copy to clipboard (platform-specific)
    if (process.platform === 'darwin') {
      await page.evaluate(content => => {
        await navigator.clipboards.writeText(content);
      });
    } } else if (process.platform === 'linux') {
      // Linux: Use xclip or xsel
    const clipboardContent = content;
    const escaped = clipboardContent.replace(/'/g, "'\\''");
    execSync(`echo "${escaped}" | xclip -selection clipboard`, { encoding: 'utf-8' });
  } else {
    // Windows fallback
    await page.evaluate(content => => {
    await navigator.clipboards.writeText(content);
      });
    }

    res.json({
      success: true,
      message: 'Content copied to clipboard',
      content: content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MCP Tool: perplexity_get_code_blocks
server.setRequestHandler('perplexity_get_code_blocks', async (req, res) => {
  try {
    const { browser, page } = await getCurrentPage();

    // Wait for response to complete if needed
    await waitForResponse(page);

    // Find all code blocks
    const codeBlocks = await page.$$('pre code');

    const result = [];

    for (let i = 0; i < codeBlocks.length; i++) {
      const block = codeBlocks[i];
      const language = await block.getAttribute('class') || '';
      const code = await block.innerText();

      result.push({
        index: i,
        language: language.match(/language-(\w+)/)?.[1] || 'unknown',
        code: code
      });
    }

    res.json({
      success: true,
      codeBlocks: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
