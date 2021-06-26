class ApiFeatures{
  constructor(query,querystr){
    this.query = query;
    this.querystr = querystr;
  }

  search()
  {
    const keyword = this.querystr.keyword ? {
      name:{
        $regex:this.querystr.keyword,
        $options:'i'
      }
    }:{}

      this.query = this.query.find({...keyword});
    return this;
  }

  filter()
  {

     const querycopy = {...this.querystr};

     const removefields = ['keyword','page'];

     removefields.forEach( item => delete querycopy[item]);

     let querystr = JSON.stringify(querycopy);

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)



     this.query = this.query.find(JSON.parse(querystr));

     return this;

  }

  pagination(perpage)
  {
      const currentpage = Number(this.querystr.page) || 1;
      const skip = perpage * (currentpage - 1);

      this.query = this.query.skip(skip).limit(perpage);

      return this;


  }
}

module.exports = ApiFeatures;
