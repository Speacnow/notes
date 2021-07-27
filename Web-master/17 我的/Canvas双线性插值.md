在Openlayers地图中实现Canvas双线性插值图层

实现双线性插值需要后台的数据格式一定要规范，比如在本例中，后台返回的数据又行数与列数，这样的话就很容易在屏幕里构建二维网格。现在给出关键代码。



```js
function DrawScalarDataByCanvas(data, CanvasNum, minlengend, maxlengend) {

    let features = data.features;
	//获取行数与列数
    let rownumber = data.rownumber;
    let colnumber = data.colnumber;
    //获取左上角的坐标
    let point_leftTop = features[0].geometry.coordinates;
    //获取右下角的坐标
    let point_rightBottom = features[features.length - 1].geometry.coordinates;



    //point_interval_width，计算x方向的点的地理间隔
    let w = (point_rightBottom[0] - point_leftTop[0]) / colnumber;
    //point_interval_height 计算y方向的点的地理间隔，注意在屏幕中像素的间隔是不等的
    let h = (point_rightBottom[1] - point_leftTop[1]) / rownumber;


	//创建canvas，覆盖整个屏幕
    let canvas = document.createElement('canvas');
    canvas.id = "ScalarCanvas";
    canvas.width = map.getSize()[0];
    canvas.height = map.getSize()[1];
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = 0;
    //$(canvas).hide();
    //将canvas添加到地图中
    map.getViewport().appendChild(canvas);
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    let mapSize = map.getSize();
    //ctx.fillRect(0, 0, mapSize[0] / 2, mapSize[1] / 2);
    let x_y_rate = mapSize[0] / mapSize[1];
    let xCanvasNum = CanvasNum;//设置x方向有多少网格
    let yCanvasNum = Math.ceil(xCanvasNum / x_y_rate);//方向有多少网格

	//x y方向网格大小
    let widthGrid = mapSize[0] / xCanvasNum;
    let heightGrid = mapSize[1] / yCanvasNum;
    let s = Date.now();
    //colorsGradient是一个颜色色带
    let color_length = colorsGradient.length;
    let count = 0;
    //利用双线性插值计算每个格网的值
    for (let i = 0; i < xCanvasNum; i++) {
        for (let j = 0; j < yCanvasNum; j++) {
            let pointCenterPixel = [widthGrid * (i + 0.5), heightGrid * (j + 0.5)];
            let pointCenterPresent = ol.proj.transform(map.getCoordinateFromPixel(pointCenterPixel), 'EPSG:3857', 'EPSG:4326');
            let i_x = Math.floor((pointCenterPresent[0] - point_leftTop[0]) / w);
            let i_y = Math.floor((pointCenterPresent[1] - point_leftTop[1]) / h);
            count++;
            //找到最近的四个已知点
            let point_lt = features[colnumber * i_y + i_x];
            let point_rt = features[colnumber * i_y + i_x + 1];
            let point_lb = features[colnumber * (i_y + 1) + i_x];
            let point_rb = features[colnumber * (i_y + 1) + i_x + 1];
			//双线性插值，先得到四个角的坐标，坐标格式是[x,y,value]
            if (point_lt && point_rt && point_lb && point_rb) {
                let Q12 = [...point_lt.geometry.coordinates, point_lt.properties.value];
                let Q22 = [...point_rt.geometry.coordinates, point_rt.properties.value];
                let Q11 = [...point_lb.geometry.coordinates, point_lb.properties.value];
                let Q21 = [...point_rb.geometry.coordinates, point_rb.properties.value];
                let value = bilint(...pointCenterPresent, Q11, Q12, Q21, Q22);
                let index_color = Math.round((value - minlengend) * (color_length - 1) / (maxlengend - minlengend));
                if (index_color < 0) index_color = 0;
                if (index_color > color_length - 1) index_color = color_length - 1;
                //将插值与颜色带进行映射
                ctx.fillStyle = colorsGradient[index_color];

            }
            //开始画
            ctx.fillRect(widthGrid * i, heightGrid * j, widthGrid, heightGrid);
        }
    }
    let e = Date.now();

    //console.log('时间：' + (e - s));
    //console.log(count);


	//双线性插值函数封装
    function bilint(x, y, Q11, Q12, Q21, Q22) {
        // if (Q11[0] != Q12[0] || Q11[1] != Q21[1] || Q21[0] != Q22[0] || Q12[1] != Q22[1]) {
        //     console.log('bilint 1')
        //     return 0;
        // }

        let x1 = Q11[0];
        let y1 = Q11[1];
        let x2 = Q22[0];
        let y2 = Q22[1];

        let fun1 = Q11[2] * (x2 - x) * (y2 - y);
        let fun2 = Q21[2] * (x - x1) * (y2 - y);
        let fun3 = Q12[2] * (x2 - x) * (y - y1);
        let fun4 = Q22[2] * (x - x1) * (y - y1);
        return (fun1 + fun2 + fun3 + fun4) / ((x2 - x1) * (y2 - y1));
    }
   
}
```

1