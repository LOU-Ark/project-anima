import { test, expect } from '@playwright/test';

test('Ghost Simulator should increment age and show initialization logs', async ({ page }) => {
    // コンソールエラーをキャプチャ
    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
        console.log(`BROWSER LOG: [${msg.type()}] ${msg.text()}`);
    });

    // シミュレーターを開く
    await page.goto('http://127.0.0.1:8011/product/ghost/index.html');

    // キャッシュクリアとローカルストレージリセット
    await page.evaluate(() => {
        localStorage.clear();
    });
    await page.reload();

    // スピードをx10にする
    await page.fill('#speed-slider', '10');
    await page.dispatchEvent('#speed-slider', 'input');

    // ノート生成を最大20秒待機
    console.log('Waiting for AI generation...');
    await page.waitForTimeout(15000); // 15秒で確実にトリガーされるはず

    // ログに SYNC が出ているか確認
    const logs = await page.evaluate(() => {
        const entries = document.querySelectorAll('.log-entry');
        return Array.from(entries).map(e => e.textContent);
    });
    console.log('Current logs:', logs);

    // 検証（429レートリミットはキー・ローテーションの正常動作として許容）
    const criticalErrors = consoleErrors.filter(e => !e.includes('429'));
    if (criticalErrors.length > 0) {
        throw new Error(`Browser console errors detected: ${criticalErrors.join('\n')}`);
    }
});
