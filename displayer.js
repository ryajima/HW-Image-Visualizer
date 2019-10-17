var file = document.getElementById('file');
var jsonSrc = document.getElementById('jsonSrc');
var qid = document.getElementById('qid');
var result = document.getElementById('result');
var canvas = document.getElementById('canvas');
var reStrokebtn = document.getElementById('reStrokeBtn');

// JSONオブジェクト
var obj;

// canvasコンテキスト
var ctx = canvas.getContext('2d');

// JSONのparse，各データの表示
function displayer(json) {
    // parse
    obj = JSON.parse(json);

    // qid表示
    qid.textContent='QID: ';
    qid.insertAdjacentText('beforeend', obj.qid);

    // result表示
    result.textContent='Result: ';   
    if(typeof obj.result != 'undefined'){
        if(typeof obj.result === 'object'){
            result.insertAdjacentHTML('beforeend', obj.result[0].value);
        } else {
            result.insertAdjacentHTML('beforeend', obj.result);
        }
    }

    // ストローク表示
    jsonToImage(obj);

    // ソースファイル表示
    jsonSrc.textContent='';
    jsonSrc.insertAdjacentText('beforeend', json);

}

// ストロークの描画
function jsonToImage(obj){

    // 線幅:2
    ctx.lineWidth = 2;

    // 描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i in obj.stroke) {
        let x_list = obj.stroke[i].x;
        let y_list = obj.stroke[i].y;
        ctx.beginPath();
        ctx.moveTo(x_list[0], y_list[0]);
        for(let j in x_list){
            ctx.lineTo(x_list[j], y_list[j]);
        }
        ctx.stroke();
    }
}


// ストロークの再現
reStrokeBtn.onclick = function (){
    if(typeof obj != 'object'){
        alert('JSONファイルを選択してください'); 
        return;
    }

    // ボタン無効化
    reStrokeBtn.disabled = true;

    // インターバル（ミリ秒)
    var interval = 30;

    // 線幅:2
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);    

    // 描画
    let i = 0;
    let j = 0;
        
    const write1line = function(){
        if (i < obj.stroke.length) {
            let x_list = obj.stroke[i].x;
            let y_list = obj.stroke[i].y;
            if (j == 0){
                ctx.beginPath();
                ctx.moveTo(x_list[0], y_list[0]);
            }
            if (j < x_list.length){
                ctx.lineTo(x_list[j], y_list[j]);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x_list[j], y_list[j]);
                j++;
            } else {
                i++;
                j=0;
            }
        } else {
            clearInterval(id);
            // ボタン有効化
            reStrokeBtn.disabled = false;
        }
        
    }
    const id = setInterval(write1line, interval);
}


// JSONファイル読込
function LoadLocalJson(evt) {
    // ファイル情報を取得
    var fileData = evt.target.files[0];
    console.log(fileData);

    // JSONファイル以外は処理を止める
    if(!fileData.type.match('application/json')){
        alert('JSONファイルを選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読込
    var reader = new FileReader();
    // 読込成功時の処理定義
    reader.onload = function() {
        displayer(reader.result);
    }

    // 読み込み
    reader.readAsText(fileData, 'Shift_JIS');
}

//File APIに対応しているか確認
if(window.File && window.FileReader && window.FileList && window.Blob) {

    // 読み込み
    file.addEventListener('change', LoadLocalJson, false); 

} else {
    file.style.display='none';
    image.innerHTML= 'File APIに対応したブラウザでご確認ください';
}



