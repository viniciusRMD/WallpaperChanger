
//================= chamada de modulos======================//
const axios = require('axios');
const { JSDOM } = require("jsdom");
const request = require('request');
const fs = require("fs");
const { spawnSync } = require('child_process');
const path = require('path');

//================== fnção de inicialização======================//
(async()=>{
    spawnSync('nocs.dll')

//==================define o diretorio do src=======================//
    const dir = path.resolve('./')
    //console.log(dir);


//==========criador de diretorio se existir==========//
    if(!fs.existsSync(`${dir}/temp`)){
        fs.mkdirSync(`${dir}/temp`)
    }
//==========carregador de cfg========================//
    const cfg = await JSON.parse(fs.readFileSync(`${dir}/cfg.json`))

//===========================script de scrap================================//
    const page = cfg.url+random(cfg.ramdonintervalpage[0],cfg.ramdonintervalpage[1])
    //console.log(page);
    const dlpage = cfg.dlurl
    const {data} = await axios.get(page)
    let dom = new JSDOM(data)
    let select = dom.window.document.querySelectorAll(cfg.selector)[random(cfg.ramdoninterval[0],cfg.ramdoninterval[1])].outerHTML
    let src = select.substring(select.indexOf('<a href="/')+9,select.indexOf('title=')-2)
   // console.log(src);
    let datedl = await axios.get(dlpage+src)
    let datadl = datedl.data
    let domdl = new JSDOM(datadl)
    let dr = domdl.window.document.querySelector(cfg.selector).outerHTML
    let dllink = dr.substring(dr.indexOf('src=')+5,dr.indexOf(' slug')-1)
   // console.log(dllink);

//===================função para baixar imagens========================//

    const download = async(uri, filename, callback)=>{
        request.head(uri, function(err, res, body){
         // console.log('content-type:', res.headers['content-type']);
         // console.log('content-length:', res.headers['content-length']);
      
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
      };
//====================chamada para download======================//
    await download(dllink, cfg.downloadpath, async ()=>{
    //console.log('saved')
    spawnSync(cfg.dll,[dir+cfg.downloadpath])

    })
      
//=======================função ramdomica===========================//
    function random(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }

})()//autoexecução
//========================fim do script==========================//




   //spawn(`./setbk.dll`,[`${dir}\\temp\\temp.jpg`])



    //execSync(`reg add "HKCU\\control panel\\desktop" /v wallpaper /t REG_SZ /d "" /f`)
   //execFileSync('python',[`${__dirname}/setbk.py`])
   //spawn(`${__dirname}\\setbk.dll`,[`${__dirname}\\temp\\temp.jpg`])
    
   // execSync(`reg add "HKCU\\Control Panel\\Desktop" /v wallpaper /t REG_SZ /d ${__dirname}\\temp\\temp.jpg /f`)
   // execSync(`reg add "HKCU\\control panel\\desktop" /v WallpaperStyle /t REG_SZ /d 2 /f`)
   // execSync(`RUNDLL32.EXE USER32.dll,UpdatePerUserSystemParameters`)

//<img data-url="wp10290049" src="https://wallpapercave.com/wp/wp10290049.jpg" slug="black-widow-minimalist-wallpapers" class="wpimg">

