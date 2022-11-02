import React, { Component } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Search component mount form to the DOM and handle searches.
 * @namespace Search
 * @extends React Component
 */
export default class Search extends Component {

    state = {
      targetFile: []
    }
  /**
   * handleSubmit takes input from search bar and redirect page.
   * @memberof Search
   * @method handleSubmit
   * @param {Object} event
   */
   onFileChange = (e) => {
    // e.preventDefault();
    let images = e.target.files;
    var i;
    const formData = new FormData();
    for( i=0;i<e.target.files.length;i++){
      formData.append("uploadimages", images[i]);
     }    
      axios({
        method: "POST",
        url: "http://localhost:8081/api/module/create",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
              toast.info('Uploaded Successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
        .catch(function (error) {
            console.log('Error fetching and parsing data', error);
        });
        this.props.history.push(`/search/all-images`);
        e.currentTarget.reset();
  }

  /**
   * Renders Form element
   * @memberof Search component
   * @return {string} - JSX element
   */
  render() {
    return (
      <form className="search-form photos" onSubmit={this.handleSubmit}>
        <div className='file file--upload'>
          <label for='input-file'>
            Upload
          </label>
          <input id='input-file' type="file" onChange={this.onFileChange} multiple accept="image/*"/>
          {/* <input id='input-file' type='file' /> */}
        </div>
        
        
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
      </form>
    )
  }
}