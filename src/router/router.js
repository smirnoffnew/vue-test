import HomePage from "../page/HomePage";
import CoursesPage from "../page/CoursesPage";
import CoursePage from "../page/CoursePage";


export const routes = [
    { path: '/home', component: HomePage },
    { path: '/courses', component: CoursesPage },
    { path: '/courses/:id', component: CoursePage },
    { path: '/courses/create', component: CoursePage }
];
