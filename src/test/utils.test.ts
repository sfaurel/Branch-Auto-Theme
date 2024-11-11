import * as assert from 'assert';
import * as vscode from 'vscode';
import { updateStatusBarItem, getActiveBranchType } from '../utils';

suite('Branch Auto Theme Utils Test Suite', () => {
    vscode.window.showInformationMessage('Starting all Branch Auto Theme Utils tests.');

    test('Updates status bar item with correct styles for Protected branch', () => {
        const mockStatusBarItem = { text: '', backgroundColor: '', color: '' } as unknown as vscode.StatusBarItem;
        updateStatusBarItem(mockStatusBarItem, 'Protected');
        assert.strictEqual(mockStatusBarItem.text, '⚠️ You are in a protected branch');
        assert.deepStrictEqual(mockStatusBarItem.backgroundColor, new vscode.ThemeColor('statusBarItem.errorBackground'));
        assert.deepStrictEqual(mockStatusBarItem.color, new vscode.ThemeColor('statusBarItem.errorForeground'));
    });

    test('Updates status bar item with correct styles for Develop branch', () => {
        const mockStatusBarItem = { text: '', backgroundColor: '', color: '' } as unknown as vscode.StatusBarItem;
        updateStatusBarItem(mockStatusBarItem, 'Develop');
        assert.strictEqual(mockStatusBarItem.text, 'You are in a develop branch');
        assert.deepStrictEqual(mockStatusBarItem.backgroundColor, new vscode.ThemeColor('statusBar.background'));
        assert.deepStrictEqual(mockStatusBarItem.color, new vscode.ThemeColor('statusBar.foreground'));
    });

    test('Updates status bar item with correct styles for Feature branch', () => {
        const mockStatusBarItem = { text: '', backgroundColor: '', color: '' } as unknown as vscode.StatusBarItem;
        updateStatusBarItem(mockStatusBarItem, 'Feature');
        assert.strictEqual(mockStatusBarItem.text, 'You are in a feature branch');
        assert.deepStrictEqual(mockStatusBarItem.backgroundColor, new vscode.ThemeColor('statusBar.background'));
        assert.deepStrictEqual(mockStatusBarItem.color, new vscode.ThemeColor('statusBar.foreground'));
    });

    test('Updates status bar item with correct styles for Other branch', () => {
        const mockStatusBarItem = { text: '', backgroundColor: '', color: '' } as unknown as vscode.StatusBarItem;
        updateStatusBarItem(mockStatusBarItem, 'Other');
        assert.strictEqual(mockStatusBarItem.text, '⚠️ You are in an unmanaged branch');
        assert.deepStrictEqual(mockStatusBarItem.backgroundColor, new vscode.ThemeColor('statusBarItem.warningBackground'));
        assert.deepStrictEqual(mockStatusBarItem.color, new vscode.ThemeColor('statusBarItem.warningForeground'));
    });

    test('Determines the correct branch type', () => {
        const mockRepository = { state: { HEAD: { name: 'main' } } } as any;

        // Mock user configuration for branch mappings
        const branchMappings = {
            protected: 'main,production',
            develop: 'develop, dev',
            feature: 'feature/*',
        };

        // Mock the `getConfiguration` function
        vscode.workspace.getConfiguration = (() => ({
            get: () => branchMappings
        })) as any;

        // Test branch type detection for Protected
        assert.strictEqual(getActiveBranchType(mockRepository), 'Protected');

        // Change the branch and test Develop type detection
        mockRepository.state.HEAD.name = 'develop';
        assert.strictEqual(getActiveBranchType(mockRepository), 'Develop');

        // Test Feature type detection
        mockRepository.state.HEAD.name = 'feature/test';
        assert.strictEqual(getActiveBranchType(mockRepository), 'Feature');

        // Test Other type detection
        mockRepository.state.HEAD.name = 'experimental';
        assert.strictEqual(getActiveBranchType(mockRepository), 'Other');

    });
});
