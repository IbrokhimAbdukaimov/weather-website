const express=require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()
const port=process.env.PORT||3000

//Define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


//Set up static directory  to setve
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ibrokhim'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Anna'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        message:'Hello world',
        name: 'Ibaa'
    })
})

app.get('',(req, res)=>{
    res.send('<h1>Hello express!!</h1>')
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'You need to provide an address'
        })
    }else {
        const address=req.query.address

        geocode(address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address 
                })
            }
            )
        })
       
    }
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Eror 404',
        errorMessage: 'Help article not found', 
        name: 'Ibaaa'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ibaa',
        errorMessage: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
