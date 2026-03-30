function F1(){
    return new Promise((resolve , reject)=>{
        console.log('Step 1 ....')
        setTimeout(()=>{
            resolve()
        },1000)
    })
}

function F2(){
    return new Promise((resolve,reject) =>{
        console.log('Step 2 ....')
        setTimeout(()=>{
            calback()       
        },1000)
    })
}

function F3(){
    return new Promise((resolve,reject)=>{
        console.log('Step 3 ....')
        setTimeout(()=>{
            resolve()
        },1200)
    })
}

