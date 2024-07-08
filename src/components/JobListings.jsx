/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';
import JobListing from './JobListing'
import Spinner from './Spinner';


const JobListings = ( {isHome = false}) => {
    const [jobs, setJobs] = useState([]); // empty first, but will be filled from the response from an API
    const [loading, setLoading] = useState(true); // loading when data is fetching

    // takes in a function and a dependency array
    useEffect(() => {
      const fetchJobs = async () => {
        const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs'
        try {
          const res = await fetch(apiUrl); // call backend
          const data = await res.json();
          setJobs(data); // assigning setJobs state to the data
        } catch (error) {
          console.log('Error fetching data', error);
        } finally {
          setLoading(false);
        }
      }

      fetchJobs();
    }, []);


    return (
    <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Jobs' : "Browse Jobs"}
          </h2>
          
          { loading ? <Spinner loading={loading}/> : ( // creating a loading screen
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              { jobs.map((job) => (
              
                <JobListing key = {job.id} job = {job} />
              )   
              )}
              </div> 
            </>
          )  }
            
                       
            
          
        </div>
      </section>
  )
}



export default JobListings