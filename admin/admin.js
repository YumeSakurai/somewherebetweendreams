(function () {
  function rememberLogin() {
    try { localStorage.setItem("sbd-cms-authenticated", "yes"); } catch (e) {}
  }
  function forgetLogin() {
    try { localStorage.removeItem("sbd-cms-authenticated"); } catch (e) {}
  }

  function registerCMSFeatures() {
    if (!window.CMS) return;

    if (typeof CMS.registerEventListener === "function") {
      CMS.registerEventListener({
        name: "postLogin",
        handler: rememberLogin
      });
      CMS.registerEventListener({
        name: "postLogout",
        handler: forgetLogin
      });
    }

    if (typeof CMS.registerPreviewStyle === "function") {
      CMS.registerPreviewStyle("./preview.css");
    }

    if (typeof CMS.registerEditorComponent === "function") {
      CMS.registerEditorComponent({
        id: "video-embed",
        label: "YouTube video",
        fields: [
          {
            name: "url",
            label: "YouTube URL or video ID",
            widget: "string"
          },
          {
            name: "caption",
            label: "Accessible title",
            widget: "string",
            required: false
          }
        ],
        pattern: /<div class="video-embed"><iframe src="https:\/\/www\.youtube-nocookie\.com\/embed\/([^"]+)" title="([^"]*)"[^>]*><\/iframe><\/div>/,
        fromBlock: function (match) {
          return { url: match[1], caption: match[2] };
        },
        toBlock: function (obj) {
          var raw = (obj.url || "").trim();
          var id = raw;
          var match = raw.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
          if (match) id = match[1];
          id = id.replace(/[^A-Za-z0-9_-]/g, "");
          if (!id) return "";
          var title = (obj.caption || "Embedded YouTube video").replace(/[&<>"]/g, function (c) {
            return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
          });
          return '<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/' +
            id + '" title="' + title +
            '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>';
        },
        toPreview: function (obj) {
          var raw = (obj.url || "").trim();
          var id = raw;
          var match = raw.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
          if (match) id = match[1];
          id = id.replace(/[^A-Za-z0-9_-]/g, "");
          if (!id) return "<p>Enter a valid YouTube URL or video ID.</p>";
          return '<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/' +
            id + '" title="Embedded YouTube video" allowfullscreen></iframe></div>';
        }
      });
    }
  }

  // Decap's script is loaded immediately before this file. Register before CMS startup.
  registerCMSFeatures();
})();
