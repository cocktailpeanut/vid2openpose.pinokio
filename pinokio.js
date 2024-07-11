module.exports = {
  title: "Video2Openpose",
  icon: "icon.gif",
  description: "Turn any video into Openpose video https://huggingface.co/spaces/fffiloni/video2openpose2",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "env")
    let installing = kernel.running(__dirname, "install.json")
    if (installing) {
      return [{ icon: "fa-solid fa-plug", text: "Installing", href: "install.json", params: { fullscreen: true, run: true } }]
    } else if (installed) {
      let running = await kernel.running(__dirname, "start.json")
      if (running) {
        let session = await kernel.require(__dirname, "session.json")
        if (session && session.url) {
          return [
            { icon: "fa-solid fa-spin fa-circle-notch", text: "Running" },
            { default: true, icon: "fa-solid fa-rocket", text: "Web UI", href: session.url, target: "_blank" },
            { icon: "fa-solid fa-terminal", text: "Terminal", href: "start.json", params: { fullscreen: true } }
          ]
        } else {
          return [
            { icon: "fa-solid fa-spin fa-circle-notch", text: "Running" },
            { default: true, icon: "fa-solid fa-terminal", text: "Terminal", href: "start.json", params: { fullscreen: true } }
          ]
        }
      } else {
        return [
          { default: true, icon: "fa-solid fa-power-off", text: "start", href: "start.json", params: { fullscreen: true, run: true } },
        ]
      }
    } else {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Install", href: "install.json", params: { run: true, fullscreen: true } }]
    }
  }
}
