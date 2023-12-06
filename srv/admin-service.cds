namespace logicalstar.srv;
using { logicalstar.bookshop as db } from '../db/schema';
using {logicalstar.metrics as metrics} from '../db/metrics';
service AdminService @(requires:'admin', path:'/admin') {
  entity Books as projection on db.Books;
  entity Authors as projection on db.Authors;
  entity BookAuthors as select
  key a.ID,
  a.name,
  b.title
  from db.Books as b 
  inner join db.Authors as a 
  on a.ID = b.author.ID
}