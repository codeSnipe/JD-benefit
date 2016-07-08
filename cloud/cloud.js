define(['./zrender', './shape/Image', './shape/Text', './shape/Path', './shape/Rectangle', './Group', './tool/guid'], function(zrender, ImageShape, TextShape, Path, Rectangle, Group, guid) {
    function Cloud(_config) {
        var _default = {
            id: "con",
            data: [],
            autoplay: true, //是否自动执行
            speed: 1000, //执行速度,
            height: 420,
            width: 780,
            hoverColor: '#f24f44',//hover状态下字体颜色
            gotoUrl: callback
        };
        var config = extend(_config, _default);
        var zr,
            wd;//福利详情
        var fontFamily = 'Microsoft YaHei';
        // 当前点击查看的福利详情
        var curWel = null,
            mouseable = false, //鼠标是否移动到福利上，如果有，则自动播放暂停
            welGroupArr = [],
            container,
            curIndex = 0, //记录自动播放福利的index
            timeGap = 100,
            animateLister = {},
            detailGroupId, //福利详情组ID
            Data, //插件数据
            callback, //初始化回调函数
            waitAnimate = false, //等待动画的状态
            preTime = 0, //自动播放动画开始时间
            preWel = null;//上次动画数据
        this.init = function() {
                Data = config.data;
                wd = Data.wd;
                callback = config.gotoUrl;
                container = document.getElementById(config.id);
                container.style.position = 'relative';
                container.style.width = config.width + 'px';
                container.style.height = config.height + 'px';
                var mainBG = document.createElement('div');
                mainBG.id = "mainBG";
                mainBG.style.height = config.height + 'px';
                mainBG.style.width = config.width + 'px';
                var main = document.createElement('div');
                main.id = "main";
                main.style.position = "absolute";
                main.style.left = 0;
                main.style.top = 0;
                main.style.height = config.height + 'px';
                main.style.width = config.width + 'px';
                container.appendChild(mainBG);
                container.appendChild(main);
                zr = zrender.init(document.getElementById('main'));
                drawBG();
                drawTexts(Data.data);
                zr.render();
                container.onmouseout = function(e) {
                    zr.clear();
                    welGroupArr = [];
                    drawTexts(Data.data);
                    var curTime = new Date().getTime();
                    if ((curTime - preTime) > (config.speed + timeGap * 2)) {
                        //2次out事件的时间间隔大于动画时间
                        mouseable = false;
                        autoPlay();
                    } else {
                        if (!waitAnimate) {
                            waitAnimate = true;
                            setTimeout(function() {
                                mouseable = false;
                                autoPlay();
                                waitAnimate = false;
                            }, (config.speed + timeGap * 2))
                        }else{
                            console.log('上次动画未完成');
                        }
                    }
                };
                container.onmouseover = function(e) {
                    stopPlay();
                };
                if (config.autoplay) {
                    autoPlay();
                }
            };
            // 画背景
        function drawBG() {
                var zrbg = zrender.init(document.getElementById('mainBG'));
                var image = new ImageShape({
                    style: {
                        image: './cloud/joy.png',
                        x: 0,
                        y: 0,
                        width: config.width,
                        height: config.height
                    }
                });
                zrbg.addShape(image);
                zrbg.render();
            }
            //画文字与背景
        function drawTexts(arr) {
            zr.clear();
            for (var i = 0; i < arr.length; i++) {
                arr[i].push(i);
                drawText(arr[i],i);
            }
            if (curWel != null) {
                openDetail(curWel, false);
            }
        }

        function drawText(item,i) {
                var text = new TextShape({
                    style: {
                        id: guid(),
                        text: item[0],
                        x: item[3],
                        y: item[4],
                        textFont: item[1] + 'px ' + fontFamily,
                        color: item[2]
                    },
                    hoverable: false
                });
                var rectMar = text.getRect(text.style);
                var wflag = false;
                if(!wd[item[0]]){
                    console.warn(item[0]+":福利无对应详情");
                    wflag = false;
                }else {
                    wflag = (wd[item[0]].length == 2);
                }
                var bg = new Rectangle({
                    style: {
                        id: guid(),
                        brushType: "both",
                        radius: 2,
                        x: rectMar.x - rectMar.width * 0.04,
                        y: rectMar.y - rectMar.height * 0.08,
                        width: rectMar.width * 1.08,
                        height: rectMar.height * 1.2,
                        color: "#fff",
                        opacity: 0,
                        strokeColor: "rgba(255,255,255,0)",
                        lineWidth: 1
                    },
                    hoverable: false,
                    clickable: wflag,
                    onclick: function(param) {
                        callback(wd[item[0]][1]);
                    }
                });
                var group = new Group({
                    id: guid(),
                    position: [0, 0],
                    clickable: true,
                    onmouseover: function(param) {
                        animateStart({
                            target: param.target.parent,
                            data: item
                        });
                    },
                    onmouseout: function(param) {
                        preWel = {
                            target: param.target.parent,
                            data: item
                        };
                    }
                });
                group.addChild(bg);
                group.addChild(text);
                welGroupArr.push(group);
                zr.addShape(group);
            }
            // 打开详情
        function openDetail(_index, link) {
                var index = _index;
                var _name = Data.data[_index][0];
                var welObj = [];
                if(!wd[_name]){
                    console.warn(_name+":福利无对应详情");
                }else{
                    welObj = wd[_name];
                }
                var item = Data.data[index];
                var bg = welGroupArr[index].childAt(0);
                var info = {
                    x: item[3] + bg.style.width / 2,
                    y: item[4],
                    width: bg.style.width,
                    height: bg.style.height,
                    title: item[0],
                    detail: welObj[0],
                    // url: welObj[1],
                    index: index,
                    link: link
                };
                deleteDetail();
                drawDetailText(info);
                curWel = _index;
            }
            //画详情
        function drawDetailText(info) {
                var shapeX = 605;
                var shapeY = 240;
                var maxLine = 5;
                var maxchar = 10;

                var path = 'M ' + info.x + ' ' + info.y + ' L ' + shapeX + ' ' + (shapeY + 20) + ' L ' + (shapeX + 135) + ' ' + (shapeY + 20);
                if (info.x < config.width / 2) {
                    // left
                    shapeX = 50;
                    shapeY = 270;
                    maxchar = 20;
                    maxLine = 3;
                    if (((info.x + info.width / 2) > 185) && (info.x - info.width / 2) < 185) {
                        path = 'M ' + (shapeX + 135) + ' ' + info.y + ' L ' + (shapeX + 135) + ' ' + (shapeY + 20) + ' L ' + shapeX + ' ' + (shapeY + 20);
                    } else if ((info.x + info.width / 2) < 185) {
                        path = 'M ' + (info.x + info.width / 2) + ' ' + info.y + ' L ' + (info.x + info.width / 2) + ' ' + (shapeY + 20) + ' L ' + shapeX + ' ' + (shapeY + 20);
                    } else {
                        path = 'M ' + (info.x - info.width / 2) + ' ' + info.y + ' L ' + (shapeX + 135) + ' ' + (shapeY + 20) + ' L ' + shapeX + ' ' + (shapeY + 20);
                    }
                } else {
                    if (((info.x - info.width / 2) < shapeX) && ((info.x + info.width / 2) > shapeX)) {
                        path = 'M ' + shapeX + ' ' + info.y + ' L ' + shapeX + ' ' + (shapeY + 20) + ' L ' + (shapeX + 135) + ' ' + (shapeY + 20);
                    } else if ((info.x - info.width / 2) > shapeX) {
                        path = 'M ' + (info.x - info.width / 2) + ' ' + info.y + ' L ' + (info.x - info.width / 2) + ' ' + (shapeY + 20) + ' L ' + (shapeX + 135) + ' ' + (shapeY + 20);
                    } else {
                        path = 'M ' + (info.x + info.width / 2) + ' ' + info.y + ' L ' + shapeX + ' ' + (shapeY + 20) + ' L ' + (shapeX + 135) + ' ' + (shapeY + 20);
                    }
                }
                if (info) {
                    //画详情组
                    var group = new Group({
                            id: guid()
                        });
                        //福利名称
                    var titleShape = new TextShape({
                        style: {
                            id: guid(),
                            text: info.title,
                            x: shapeX,
                            y: shapeY,
                            textFont: '16px ' + fontFamily,
                            color: '#fff'
                        },
                        z: 4,
                        hoverable: false
                    });
                    // 连接线
                    var line = new Path({
                        style: {
                            id: guid(),
                            brushType: 'stroke',
                            x: 0,
                            y: 0,
                            path: path,
                            strokeColor: '#d9060a',
                            lineWidth: 1
                        },
                        hoverable: false
                    });
                    group.addChild(titleShape);
                    group.addChild(line);
                    // 福利详情
                    var maxRow = (Math.ceil((info.detail.length) / maxchar) > maxLine) ? maxLine : Math.ceil((info.detail.length) / maxchar);
                    var startIndex = 0;
                    for (var index = 0; index < maxRow; index++) {
                        var dis = maxchar;
                        var cacheText = info.detail.substr(startIndex, dis);
                        //获取单行的数字个数，             
                        var s = cacheText.replace(/[^0-9]+/g, "").length;
                        dis = maxchar + Math.ceil(s / 2);
                        var text = info.detail.substr(startIndex, dis);
                        if ((index == maxRow - 1) && (text.length > (dis - 1))) {
                            text = text.substring(0, text.length - 1);
                            text = text + "...";
                        }
                        drawDetail(text, index);
                        startIndex += dis;
                    }

                    function drawDetail(text, row) {
                            var content = new TextShape({
                                style: {
                                    id: guid(),
                                    text: text,
                                    x: shapeX,
                                    y: shapeY + 40 + row * 15,
                                    color: "#fff",
                                    textFont: "12px " + fontFamily
                                },
                                hoverable: false
                            });
                            group.addChild(content);
                        }
                        //详情按钮
                    // var btn = new Rectangle({
                    //     style: {
                    //         id: guid(),
                    //         brushType: "both",
                    //         x: shapeX,
                    //         y: shapeY + 40 + maxRow * 15 + 15,
                    //         width: 80,
                    //         height: 28,
                    //         color: "#ff5f5f",
                    //         strokeColor: 'rgba(255,255,255,.6)',
                    //         lineWidth: 1,
                    //         radius: 2
                    //     },
                    //     hoverable: false,
                    //     clickable: true,
                    //     onmouseover: function(param) {
                    //         if (zr.animate(param.target.id, "style", false) && !animateLister[param.target.id]) {
                    //             animateLister[param.target.id] = true;
                    //             zr.animate(param.target.id, "style", false)
                    //                 .when(timeGap, {
                    //                     color: '#fff',
                    //                     strokeColor: '#ff5f5f'
                    //                 })
                    //                 .start();
                    //         }
                    //         if (zr.animate(btnTxt.id, "style", false) && !animateLister[btnTxt.id]) {
                    //             animateLister[btnTxt.id] = true;
                    //             zr.animate(btnTxt.id, "style", false)
                    //                 .when(timeGap, {
                    //                     color: "#f24f44"
                    //                 })
                    //                 .start();
                    //         }
                    //     },
                    //     onmouseout: function(param) {
                    //         if (zr.animate(param.target.id, "style", false)) {
                    //             zr.animate(param.target.id, "style", false)
                    //                 .when(timeGap, {
                    //                     color: "#ff5f5f",
                    //                     strokeColor: 'rgba(255,255,255,.6)'
                    //                 })
                    //                 .start();
                    //         }
                    //         if (zr.animate(btnTxt.id, "style", false)) {
                    //             zr.animate(btnTxt.id, "style", false)
                    //                 .when(timeGap, {
                    //                     color: "#fff"
                    //                 })
                    //                 .start();
                    //         }
                    //         setTimeout(function() {
                    //             animateLister[param.target.id] = false;
                    //             animateLister[btnTxt.id] = false;
                    //         }, timeGap);
                    //
                    //     },
                    //     onclick: function() {
                    //         callback(info.url);
                    //     }
                    // });
                    // var btnTxt = new TextShape({
                    //     style: {
                    //         id: guid(),
                    //         x: shapeX + 15,
                    //         y: shapeY + 40 + maxRow * 15 + 29,
                    //         text: "查看详情",
                    //         color: "#fff",
                    //         textFont: "12px " + fontFamily
                    //     },
                    //     hoverable: false
                    // });
                    // group.addChild(btn);
                    // group.addChild(btnTxt);
                    zr.addShape(group);
                    detailGroupId = group.id;
                    zr.refresh();
                }
            }
            //删除详情
        function deleteDetail() {
                if (detailGroupId) {
                    zr.delGroup(detailGroupId);
                    zr.refresh();
                    detailGroupId = null;
                }
            }
            //缩放动画开始
        function animateStart(data, callback) {
            if(preWel)animateEnd(preWel);
                if ((typeof callback) != 'function') {
                    callback = function() {};
                }
                var group = data.target;
                var bg = group.childAt(0);
                var text = group.childAt(1);
                var item = data.data;
                bg.z = 2;
                text.z = 3;
                var scale = Data.fontScale[item[1]] || 1.5;
                var _x = 0 - (bg.style.x + bg.style.width / 2) * (scale - 1);
                var _y = 0 - (bg.style.y + bg.style.height / 2) * (scale - 1);
                if (zr.animate(group.id, "", false) && !animateLister[group.id]) {
                    animateLister[group.id] = true;
                    zr.animate(group.id, "", false)
                        .when(timeGap, {
                            scale: [scale, scale],
                            position: [_x, _y]
                        })
                        .start();
                    if (!config.autoplay || mouseable) {
                        openDetail(item[5], false);
                    }
                }
                if (zr.animate(bg.id, "style", false) && !animateLister[bg.id]) {
                    animateLister[bg.id] = true;
                    zr.animate(bg.id, "style", false)
                        .when(timeGap, {
                            opacity: 1,
                            strokeColor:'#d9060a'
                        })
                        .start();
                }
            if(zr.animate(text.id,'style',false) && !animateLister[text.id]){
                animateLister[text.id] = true;
                zr.animate(text.id, "style", false)
                    .when(timeGap, {
                        color:config.hoverColor
                    })
                    .start();
            }
                setTimeout(function() {
                    callback();
                }, timeGap);
            }
            // 缩放动画结束
        function animateEnd(data, callback) {
                if ((typeof callback) != 'function') {
                    callback = function() {};
                }
                var group = data.target;
                var bg = group.childAt(0);
                var text = group.childAt(1);
                bg.z = 0;
                text.z = 0;
                if (zr.animate(group.id, "", false)) {
                    zr.animate(group.id, "", false)
                        .when(timeGap, {
                            scale: [1, 1],
                            position: [0, 0]
                        })
                        .start();
                }
                if (zr.animate(bg.id, "style", false)) {
                    zr.animate(bg.id, "style", false)
                        .when(timeGap, {
                            opacity: 0,
                            strokeColor:'rgba(255,255,255,0)'
                        })
                        .start();
                }
                if (zr.animate(text.id, "style", false)) {
                    zr.animate(text.id, "style", false)
                        .when(timeGap, {
                            color: data.data[2]
                        })
                        .start();
                }
                setTimeout(function() {
                    animateLister[group.id] = false;
                    animateLister[bg.id] = false;
                    animateLister[text.id] = false;
                    callback();
                }, timeGap);
            }
            // 福利轮播自动
        function autoPlay() {
            if (config.autoplay && !mouseable) {
                if (curIndex == welGroupArr.length) curIndex = 0;
                var target = welGroupArr[curIndex],
                    data = Data.data[curIndex];
                preTime = new Date().getTime();
                animateStart({
                        target: target,
                        data: data
                    },
                    function() {
                        setTimeout(function() {
                            preWel = {
                                target: target,
                                data: data
                            };
                            curIndex++;
                            autoPlay();
                        }, config.speed);
                    }
                );
                openDetail(data[5], false);
            }
        }

        function stopPlay() {
                mouseable = true;
                autoPlay();
            }
            // 合并传入参数与默认参数
        function extend(obj1, obj2) {
            for (var prop in obj2) {
                if (obj1.hasOwnProperty(prop)) continue;
                obj1[prop] = obj2[prop];
            }
            return obj1;
        }
        function getIndex(_name) {
            for (var i = 0; i < Data.data.length; i++) {
                if (Data.data[i][0] == _name) {
                    return i;
                }
            }
        }
    }
    return Cloud;
})