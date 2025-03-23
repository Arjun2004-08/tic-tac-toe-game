let boxes=document.querySelectorAll(".box");
let rstBtn=document.querySelector("#rst-btn");
let newBtn=document.querySelector("#new-btn");
let msgcont=document.querySelector(".win-cont");
let msg=document.querySelector("#msg");
let turnMsg=document.querySelector(".turn-msg");
let xscr=document.querySelector(".x-scr");
let oscr=document.querySelector(".o-scr");
let scrbtn=document.querySelector(".scr-btn");

let count=0;
let span= document.querySelector("#turn-smb");
let turn0=true;
let win=false;
let m=0;
let n=0;
const winpatt=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];
const resetgame=()=>{
    turn0=true;
    enablebox();
    msgcont.classList.add("hide");
    count=0;
    win=false;
    turnMsg.style.display = "block";
    span.innerText="O";
    span.style.color="#A1E3F9";
    
}

boxes.forEach((box)=>{
    
    box.addEventListener(("click"),()=>{
        
        if(turn0){
            box.innerText="O"
            box.style.color = "#143D60";
            box.style.fontSize = "15vmin";
            box.style.fontWeight = "bold";
            turn0=false;
            count++;
        }
        else{
            box.innerText="X";
            box.style.color = "#A31D1D";
            box.style.fontSize = "15vmin";
            box.style.fontWeight = "bold";
            turn0=true;
            count++;
        }
        if (!win && count < 9) {
            span.innerText = turn0 ? "O" : "X";
            span.style.color = turn0 ? "#A1E3F9" : "#E50046";
        }
        box.disabled=true;
        checkWinner();
        
    })
    
})

const disablebox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enablebox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerHTML=`Congratulations!! The winner is: <span style="color: ${winner === 'O' ? '#A1E3F9' : '#E50046'}; font-weight:bold; font-size:2rem;">${winner}</span>`;
    msgcont.classList.remove("hide");
    disablebox();
    turnMsg.style.display = "none";
    if(winner=="O"){
        m++;
        oscr.innerText=m;
    }
    else{
        n++;
        xscr.innerText=n;
    }

};
const draw=()=>{
    msg.innerText="The match ends in a Draw!!";
    msgcont.classList.remove("hide");
    disablebox();
    turnMsg.style.display = "none";
}

const checkWinner=()=>{
    for(let pattern of winpatt){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val==pos2val&&pos2val==pos3val){
                win=true;
                showWinner(pos1val);
                return;
            }
        }
    }
    if(count == 9 && !win){
        draw();
    }
}

newBtn.addEventListener("click",resetgame);
rstBtn.addEventListener("click",resetgame);
scrbtn.addEventListener("click",()=>{
    oscr.innerText=0;
    xscr.innerText=0;
    m=0;
    n=0;
});
