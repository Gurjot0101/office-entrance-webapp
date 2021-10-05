if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methoverride = require('method-override');
const Userdata = require("./models/userdata");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methoverride('_method'));
app.use(express.json());


//connecting to db
const atlasurl = process.env.MONGO_URL;
mongoose.connect(atlasurl)
    .then(() => {
        console.log("DB CONNECTED")
    })
    .catch((err) => {
        console.log(err)
    })



//homepage
app.get('/home', async(req, res) => {
    res.render('home');
})


//show data page
app.get('/home/data', async(req, res) => {
    const data = await Userdata.find({}).sort({ date: -1 });
    res.render('userdata', { data });
})



//checkin page
app.get('/home/checkin', async(req, res) => {
    const e = "";
    res.render('checkin', { e });
})

//enter check-in data 
app.post('/home', async(req, res) => {
    const { name, email, phone, date, time } = req.body;
    if (name === "" && email === "") {
        const e = "Enter all fields!";
        res.render('checkin', { e });
    } else {

        //email funcion
        // entermail(name, email, time);

        const time_i = time;

        const status = 'In-Office';
        await Userdata.create({ name, email, phone, date, time_i, status });
        res.redirect('/home');
    }
})




//checkout page
app.get('/home/checkout', async(req, res) => {
    const e = "";
    res.render('checkout', { e });
})

//enter check-out data
app.put('/home', async(req, res) => {
    const { nam, mail, time } = req.body;

    if (nam === "" || mail === "") {
        const e = "Enter all fields!";
        res.render('checkout', { e });
    } else {

        const a = await Userdata.find({ name: nam, email: mail });

        if (a[0] === undefined) {
            const e = "You entered Wrong Information";
            res.render('checkout', { e });
        }

        //email funcion
        // exitmail(nam, mail, time);

        const to = time;

        await Userdata.findByIdAndUpdate(a[0]._id, { $set: { status: 'Not In-Office', time_o: to } });
        res.redirect('/home');
    }
})



//enter
function entermail(name, email, time) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: email,
        from: "gurjot0101.cse19@chitkara.edu.in",
        subject: "Entered OFFICE",
        text: `Hello dear ${name}, you entered the office at ${time}.`
    };
    sgMail.send(msg)
        .then(() => {
            console.log('sent')
        }).catch((e) => {
            console.log(e)
        })
}


//exit
function exitmail(name, email, time) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: email,
        from: "gurjot0101.cse19@chitkara.edu.in",
        subject: "Exited OFFICE",
        text: `Hello dear ${name}, you successfully exited the office at ${time}.
        Have a Nice Day!!!`
    };
    sgMail.send(msg)
        .then(() => {
            console.log('sent')
        }).catch((e) => {
            console.log(e)
        })
}




app.get('/', async(req, res) => {
    res.redirect('/home');
})


const port = process.env.PORT || 3333
app.listen(port, (req, res) => {
    console.log(`listening at ${port}`);
})