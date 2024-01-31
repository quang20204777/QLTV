import CreateBook from "../../pages/AdminPages/Book/CreateBook";
import GiveBook from "../../pages/AdminPages/Book/GiveBook";
import ListBook from "../../pages/AdminPages/Book/ListBook";
import RegisterBook from "../../pages/AdminPages/Book/RegisterBook";
import HeaderAdmin from "../../pages/AdminPages/Header/HeaderAdmin";
import IndexAdmin from "../../pages/AdminPages/Index/IndexAdmin";
import CreateCard from "../../pages/AdminPages/User/CreateCard";
import UserManager from "../../pages/AdminPages/User/UserManager";
import Login from "../../pages/Login/Login";
import PageNotFound from "../../pages/PageError/PageNotFound";
import Register from "../../pages/Register/Register";
import BookDetail from "../../pages/UserPage/Book/BookDetail";
import BookLibrary from "../../pages/UserPage/Book/BookLibrary";
import BookTitle from "../../pages/UserPage/Book/BookTitle";
import MyBook from "../../pages/UserPage/Book/MyBook";
import Contact from "../../pages/UserPage/Contact/Contact";
import HeaderUser from "../../pages/UserPage/Header/HeaderUser";
import IndexUser from "../../pages/UserPage/Index/IndexUser";

// Public routes
export const publicRoutes = [
    //login
    { path: '/', component: Login },
    { path: '/login', component: Login },
    //register user
    { path: '/register', component: Register },
    //admin Page
    { path: '/adminPage', component: IndexAdmin, layout: HeaderAdmin, pathLayout: '/adminPage' },
    { path: '/adminPage/indexAdmin', component: IndexAdmin, layout: HeaderAdmin, pathLayout: '/adminPage' },
    { path: '/adminPage/userManager', component: UserManager, layout: HeaderAdmin, pathLayout: '/adminPage' },
    { path: '/adminPage/createCard', component: CreateCard, layout: HeaderAdmin, pathLayout: '/adminPage' },
    { path: '/adminPage/bookManager/listBook', component: ListBook, layout: HeaderAdmin, pathLayout: '/adminPage' },
    { path: '/adminPage/bookManager/createBook', component: CreateBook, layout: HeaderAdmin, pathLayout: '/adminPage' },
    { path: '/adminPage/bookManager/registerBook', component: RegisterBook, layout: HeaderAdmin, pathLayout: '/adminPage' },
    { path: '/adminPage/bookManager/giveBook', component: GiveBook, layout: HeaderAdmin, pathLayout: '/adminPage' },

    //user Page
    { path: '/userPage', component: IndexUser, layout: HeaderUser, pathLayout: '/userPage' },
    { path: '/userPage/introduce', component: Contact, layout: HeaderUser, pathLayout: '/userPage' },
    { path: '/userPage/book/myBook', component: MyBook, layout: HeaderUser, pathLayout: '/userPage' },
    { path: '/userPage/book/bookLibrary', component: BookLibrary, layout: HeaderUser, pathLayout: '/userPage' },
    { path: '/userPage/book/title', component: BookTitle, layout: HeaderUser, pathLayout: '/userPage' },
    { path: '/userPage/book/title/bookDetailtail', component: BookDetail, layout: HeaderUser, pathLayout: '/userPage' },
    { path: '*', component: PageNotFound },
];

// Private routes
export const privateRoutes = [];