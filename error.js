setTimeout(()=>{
    throw new Error('oops')
},300)

process.on('uncaughtException', ()=>{
    console.log('an error')
})

process.on('unhandledRejection', ()=>{
    
})
