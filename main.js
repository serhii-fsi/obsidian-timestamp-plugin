

var obsidian = require("obsidian");


class ExamplePlugin extends obsidian.Plugin {
	onunload() {
		console.log("Unloading Timestamp Plugin...");
	}
	
	async onload() {
    console.log("Loading Timestamp Plugin...");

    // Register the command to insert the timestamp
    this.addCommand({
      id: 'insert-timestamp',
      name: 'Insert Timestamp',
      hotkeys: [
        {
          // modifiers: ["Mod", "Shift", "Alt"], // Example: Ctrl+Shift+T or Cmd+Shift+T
          // modifiers: ["Mod"], // Example: Ctrl+Shift+T or Cmd+Shift+T
          // modifiers: ["Shift", "Alt"], // Example: Ctrl+Shift+T or Cmd+Shift+T
          modifiers: ["Alt"], // Example: Ctrl+Shift+T or Cmd+Shift+T
          key: "T"
        }
      ],
      callback: () => this.insertTimestamp()
    });
	}

  insertTimestamp() {
    const timestamp = this.generateTimestamp();

    const activeLeaf = this.app.workspace.activeLeaf;
    if (activeLeaf && activeLeaf.view && activeLeaf.view.editor) {
      // Try to insert directly into the editor
      const editor = activeLeaf.view.editor;
      const cursor = editor.getCursor();
      editor.replaceRange(timestamp, cursor);
    } else {
      // If not in a markdown editor, copy to clipboard
      navigator.clipboard.writeText(timestamp)
        .then(() => {
          new Notice("Timestamp copied to clipboard.");
        })
        .catch(() => {
          new Notice("Failed to copy timestamp.");
        });
    }
  }

  generateTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}-${hours}:${minutes}`;
  }
}

module.exports = ExamplePlugin;