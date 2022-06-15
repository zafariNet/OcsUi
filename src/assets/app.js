var Layout = (function () {
  return {
    initialTreeview: function (url) {
      $(function () {
        $('[data-widget="treeview"]').Treeview("init");

        // $("ul.nav-sidebar a")
        //   .filter(function () {
        //     return this.href == url;
        //   })
        //   .addClass("active");

        // // for treeview
        // $("ul.nav-treeview a")
        //   .filter(function () {
        //     debugger;
        //     return this.pathname == url;
        //   })
        //   .parentsUntil(".nav-sidebar > .nav-treeview")
        //   .addClass("menu-open")
        //   .prev("a")
        //   .addClass("active");
      });
    },
  };
})(Layout || {});

$(function () {
  $("[ng-reflect-fragment]").on("click", (event) => {
    if (event.target.name) {
      let targetId = "#" + event.target.name;
      $("html, body").animate(
        { scrollTop: $(targetId).offset().top - 100 },
        "slow"
      );
    }
  });
  $.fn.extend({
    treed: function (o) {
      var openedClass = "fa fa-minus";
      var closedClass = "fa fa-plus";

      if (typeof o != "undefined") {
        if (typeof o.openedClass != "undefined") {
          openedClass = o.openedClass;
        }
        if (typeof o.closedClass != "undefined") {
          closedClass = o.closedClass;
        }
      }

      //initialize each of the top levels
      var tree = $(this);
      tree.addClass("tree");
      tree
        .find("li")
        .has("ul")
        .each(function () {
          var branch = $(this); //li with children ul
          branch.prepend(
            "<i class='indicator glyphicon " + closedClass + "'></i>"
          );
          branch.addClass("branch");
          branch.on("click", function (e) {
            if (this == e.target) {
              var icon = $(this).children("i:first");
              icon.toggleClass(openedClass + " " + closedClass);
              $(this).children().children().toggle();
            }
          });
          branch.children().children().toggle();
        });
      //fire event from the dynamically added icon
      tree.find(".branch .indicator").each(function () {
        $(this).on("click", function () {
          $(this).closest("li").click();
        });
      });
      //fire event to open branch if the li contains an anchor instead of text
      tree.find(".branch>a").each(function () {
        $(this).on("click", function (e) {
          $(this).closest("li").click();
          e.preventDefault();
        });
      });
      //fire event to open branch if the li contains a button instead of text
      tree.find(".branch>button").each(function () {
        $(this).on("click", function (e) {
          $(this).closest("li").click();
          e.preventDefault();
        });
      });
    },
  });
  $.fn.extend({
    formatXml: function (xml) {
      debugger;
      var formatted = "";
      var reg = /(>)(<)(\/*)/g;
      xml = xml.replace(reg, "$1\r\n$2$3");
      var pad = 0;
      jQuery.each(xml.split("\r\n"), function (index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad != 0) {
            pad -= 1;
          }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }

        var padding = "";
        for (var i = 0; i < pad; i++) {
          padding += "  ";
        }

        formatted += padding + node + "\r\n";
        pad += indent;
      });

      return formatted;
    },
  });

  $.fn.extend({
    setXmlFormat: function (id) {
      var editor = ace.edit(id);
      editor.session.setMode("ace/mode/html");
      var commandId = "describeCodeLens";
      editor.commands.addCommand({
        name: commandId,
        exec: function (editor, args) {
          // services available in `ctx`
          alert("CodeLens command called with arguments " + args);
        },
      });
      editor.commands.addCommand({
        name: "clearCodeLenses",
        exec: function (editor, args) {
          editor.setOption("enableCodeLens", false);
          codeLens.clear(editor.session);
        },
      });
      editor.setOption("enableCodeLens", false);

      window.editor = editor;
    },
  });

  // Accardeon
  $(".set > a").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).siblings(".content-acc").slideUp(200);
      $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
    } else {
      $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
      $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
      $(".set > a").removeClass("active");
      $(this).addClass("active");
      $(".content-acc").slideUp(200);
      $(this).siblings(".content-acc").slideDown(200);
    }
  });

  // fix action buttons
  $(document).scroll(function (event) {
    var actionButtons = $("#action-button-inner");
    var top = actionButtons.offset().top;
    console.log(top);
    if (top > 170) {
      $("#action-button-inner").find("img").attr("width", 25);

      $("#action-button-inner")
        .find("a")
        .removeClass("click-post-action-button");
      $("#action-button-inner").find("a").css("padding", "5px 5px");
      $("#action-button-inner")
        .find("a")
        .addClass("click-post-action-button-scrolled");
      actionButtons.css("background-color", "#343A40");
    } else {
      $("#action-button-inner").find("img").attr("width", 35);
      $("#action-button-inner").find("a").addClass("click-post-action-button");
      $("#action-button-inner").find("a").css("padding", "");
      $("#action-button-inner")
        .find("a")
        .removeClass("click-post-action-button-scrolled");
      actionButtons.css("background-color", "white");
    }
  });
  $('[data-toggle="tooltip"]').tooltip();
  $("#checkboxPrimary22").click(function (e) {
    e.stopPropagation();
  });
});
