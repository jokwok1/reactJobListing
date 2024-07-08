import React from "react";
import { Route, createBrowserRouter, 
  createRoutesFromElements, RouterProvider} from 'react-router-dom'

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout"
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobPage, {jobLoader} from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  const addJob = async (newJob) => {
    // Add new Job
    const res = await fetch('/api/jobs', {
      method : 'POST', // post req
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  }

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method : 'DELETE', // post req
    });
    return;
  };

  // Update Job 
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method : 'PUT', // post req
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(job)
    });
    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element = {<HomePage />}/>
      <Route path='/jobs' element = {<JobsPage />}/>
      <Route path='/add-job' element = {<AddJobPage addJobSubmit={addJob} />}/>
      <Route path='/jobs/:id' element = {<JobPage deleteJob={ deleteJob}/>} loader= {jobLoader}/>
      <Route path='*' element = {<NotFound />}/>
      <Route path='/edit-job/:id' element = {<EditJobPage updateJobSubmit={updateJob} />} loader= {jobLoader}/>
    </Route>
    )
  );

  return (
    <RouterProvider router={router}/>
  );
};

export default App;
