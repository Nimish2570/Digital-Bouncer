class ApiFratures{
    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;

    }
search(){
    const keyword = this.querystr.keyword;
    if(keyword){
        this.query = this.query.find({
            name:{
                $regex:keyword,
                $options:'i'
            }
        })
    }
    return this;

}
filter(){
    const querycopy = {...this.querystr};
    //remove fields from the query
    const removeFields = ['keyword','limit','page'];
    removeFields.forEach(el=>delete querycopy[el]);
    //advance filter for price , ratings etc
    let querystr = JSON.stringify(querycopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`);
    this.query = this.query.find(JSON.parse(querystr));
    return this;
}
pagination(resPerPage){
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resPerPage * (currentPage-1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
}



}

module.exports = ApiFratures