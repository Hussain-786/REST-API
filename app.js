const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/wikipediaDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article", articleSchema);


app.route("/articles")

.get(function(req, res){
  Article.find({}, function(err, foundArticle){
    if(err){
      console.log(err);
    }else{
      res.send(foundArticle);
    }
  });
})

.post(function(req, res){
  const bodyTitle = req.body.title;
  const bodyContent = req.body.content;
  const article = new Article({
    title: bodyTitle,
    content: bodyContent
  });
  article.save(function(err){
    if(err){
      console.log(err);
    }
  });
})

.delete(function(req, res){
    Article.deleteMany({}, function(err){
      if(err){
        console.log(err);
      }else{
        res.send("successfully deleted");
      }
    });
  });

app.route("/articles/:customName")

.get(function(req, res){
  const articleName = req.params.customName;
  Article.findOne({title: articleName}, function(err, foundArticle){
    if(err){
      console.log(err);
    }else{
      res.send(foundArticle);
    }
  });
})
.put(function(req, res){
  const articleName = req.params.customName;
  console.log(req.body.title);
  Article.updateMany(
    {name: articleName},
    {title: req.body.title,
    content: req.body.content
  },
  {overwrite: true},
  function(err){
    if(!err){
      console.log("Successfully updated");
    }
  }
  );
});

app.listen(3000, function(){
  console.log("server running at port 3000");
});
