import BasicTable from '@/components/table/table';
import { getAllUsers, countUsers, deleteAUser } from '@/lib/users/usersLib';
import AddBtn from '@/components/add-btn/add-btn';
import classes from './users.module.css'

const Userspage = async ({searchParams}) => {

  const pagesCount = await countUsers()

  const pageNumber = searchParams?.page || 1;
   
  const users = await getAllUsers(pageNumber)

 return (
   <div className={classes.container} >
     <BasicTable columns={["username", "password", "isdisabled"]} data={users}  pagesCount={pagesCount || 1} href="users/update/" actionFuncModal={deleteAUser} textModal={"Delete"} actionModal={"delete the user"} />
     <AddBtn path="dashboard/users" text="Add New User" />
   </div>
 )
}

export default Userspage