
//=========================chamada de modulos======================//
const ConsoleWindow = require("node-hide-console-window");
const axios = require('axios');
const { JSDOM } = require("jsdom");
const fs = require("fs");
const { spawnSync } = require('child_process');
const path = require('path');

//==============função de inicialização  assincrona==============//
(async()=>{
    //spawnSync('nocs.dll')
    ConsoleWindow.hideConsole();

//=====define o diretorio do src=========//
    const dir = path.resolve('./')
    //console.log(dir);


//=====criador de diretorio se existir=====//
    if(!fs.existsSync(`${dir}/temp`)){
        fs.mkdirSync(`${dir}/temp`)
    }
//=====================carregador de cfg============================//
    const cfg = await JSON.parse(fs.readFileSync(`${dir}/cfg.json`))

//===========================script de scrap==========================//
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

//================função para baixar imagens com axios===================//

      const download = await axios.get(dllink, {responseType: "stream"} )  
      download.data.pipe(fs.createWriteStream(cfg.downloadpath));
  
//====================chamada para download=============================//

    spawnSync(cfg.dll,[dir+cfg.downloadpath])

      
//=================função para gerar numeros ramdomicos================//
    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

})()//autoexecução
//========================fim do script==========================//
