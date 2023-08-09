import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let workList = [];
let todayList = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {todayList: todayList});
});

app.get("/work", (req, res) => { 
    res.render("work.ejs", {workList: workList});
});

app.post("/submitWork", (req, res) => {
    const deleteWorkItem = req.body["workListId"];
    workList.splice(deleteWorkItem, 1);
    res.render("work.ejs", {workList: workList});
});

app.post("/addWork", (req, res) => {
    const item = req.body["addItem"];
    if(item){
        workList.push(item);
    }
    res.render("work.ejs", {workList: workList});
})

app.post("/submitToday", (req, res) => {
    const deleteTodayItem = req.body["todayListId"];
    todayList.splice(deleteTodayItem, 1);
    res.render("index.ejs", {todayList: todayList});
});

app.post("/addToday", (req, res) => {
    const item = req.body["addItem"];
    if (item) {
        todayList.push(item);
    }
    res.render("index.ejs", {todayList: todayList});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});