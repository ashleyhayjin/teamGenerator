// function that returns html code. 

function templateHtml (team){
    console.log(team[0]);
    return `<div>${team[0].getName()}</div>`
}

module.exports = templateHtml;