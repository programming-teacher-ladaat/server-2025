- mongo relationships:

// orderDetails - oid, pid, amount
// orders       - oid, cid, date
// customers    - cid, aid
// products     - pid
// address      - aid, city, street, num

// customers = [{
//      _id
//      name
//      address: { city, street, num }
// }]
// { 'address.city': 'elad' }

// students = { _id, name, courses: [{cid, name, desc, 'courses'}, {cid, 'courses'}, {cid, 'courses'}] }
// { 'courses.name': /^a/ }

// courses  = { _id, name, price, lecturer: {}, categories: ['C#', 'C++'], students: [sid, sid, sid] }


// populate (mongoose) -> join
// aggregate $lookup   -> mongoose

// _id, ref חובה שהאוביקט יכיל populate-אם רוצים להשתמש ב
// ref לא מגביל את הקוד שיהיה רק מטבלה מסוימת, נצטרך לבדוק זאת באופן ידני

- joi - validation:
    - npm i joi
- multer - upload file to server
- deploy node & react to render