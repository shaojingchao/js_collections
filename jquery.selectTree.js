define(function (require) {
    require("jquery");
    (function($) {
        var selectTree = function(options) {


            this.init = function() {
                // this.defValue();
                this.Selects = [];
                this.changeEvent();
                this.reset();
            };

            // 默认值
            var defaults = {
                id: ["sel1", "sel2", "sel3", "sel4", "sel5"],
                data: [],
                def: [],
                sub: "sub"
            };
            var settings = $.extend({}, defaults, options);


            // 绑定事件
            this.changeEvent = function() {
                var _this = this;
                $.each(settings.id, function(i, n) {
                    _this.Selects[i] = $("#" + n)[0];
                    $("#" + n).on("change",
                        function() {
                            _this.getMenu(i);
                        });
                });
            };

            this.reset = function() {

                //初始化select
                this.set($("#" + settings.id[0]), settings.data, settings.def.shift());
                this.getMenu(0);

            };

            this.getMenu = function(index) {


                // 获取菜单
                var menu = settings.data;
                var selectArr = settings.id;

                for (var i = 1; i < selectArr.length; i++) {

                    if (menu.length > 0) {

                        var va = $("#" + selectArr[i - 1]).val();

                        if (va !== "") {
                            for (var j = 0; j < menu.length; j++) {
                                var item = menu[j];

                                if (item.val === va) {
                                    menu = item[settings["sub"]] || [];
                                }
                            }
                        } else {
                            menu = [];
                        }

                        if (i > index) {
                            this.set($("#" + selectArr[i]), menu, settings.def.shift());
                        }


                    } else {
                        //没有数据
                        this.set($("#" + selectArr[i]), [], "");
                    }
                }

            };

            // 设置menu
            this.set = function($sel, menu, val) {
                if (menu.length > 0) {
                    var tpl = "";
                    $.each(menu, function(i, n) {
                        var isSelected = (n.val == val)?"selected":"";
                        tpl += "<option value=" + n.val + " "+isSelected+">" + n.txt + "</option>";
                    });
                    $sel.show().html(tpl);
                }else{
                    $sel.hide();
                }
            };



            // 设置默认值
            this.defValue = function() {
                if (settings.val.length > 0) {
                    $.each(settings.val, function(i, n) {
                        $("#" + settings.id[i]).val(n);
                    });
                }
            };
        };


        $.selectTree = function(opts){
            return new selectTree(opts).init();
        };

    })(jQuery);
});

