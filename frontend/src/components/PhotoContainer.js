import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";


/**
 * PhotoContainer component will mount search results to the DOM.
 * @namespace PhotoContainer
 * @extends React Component
 */
export default class PhotoContainer extends Component {

  /** 
   * Will create the main state of the App.
   * @constructor
   * @type {object}
   */
  constructor() {
    super();
    this.state = {
      images: [],
      isLoading: true
    } 
  } 

  /**
   * fetchData uses Axios to fetch data from API and stores it into state's object.
   * @memberof PhotoContainer
   * @method fetchData
   * @param {string} get
   */
  fetchData = (query = "all-images") => {
    
    axios
      .get(`http://localhost:8081/api/module/${query}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          images: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  /**
   * resetState reset state to its initial values.
   * @memberof PhotoContainer
   * @method resetState
   */
  resetState = () => {
    this.setState({
      images: [],
      isLoading: true
    })
  }
  favouriteImage = (imageId,featuredId) =>{
    const data = { featured: featuredId };
    const textToShown = featuredId == 0 ? "Removed From Favourite" : "Added To Favourite" ;
    axios
      .put(`http://localhost:8081/api/module/update/${imageId}`,data)
      .then(response => {
        this.fetchData(this.props.match.params.query);
        toast.success((textToShown), {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  
  }

  deleteImage = (imageId) =>{
    axios
      .delete(`http://localhost:8081/api/module/delete/${imageId}`)
      .then(response => {
        this.fetchData(this.props.match.params.query);
        toast.info('Deleted Successfully', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  } 
  /**
   * componentDidMount calls fetchData when element is first mount.
   * @memberof PhotoContainer
   * @method componentDidMount
   * @inner
    * @func fetchData
    * @param {string} match.params
   */
  componentDidMount() {
    this.fetchData(this.props.match.params.query)
  }

  /**
   * componentDidUpdate watches for path changed through history object.
   * @memberof PhotoContainer
   * @method componentDidUpdate
   * @inner
    *  @func resetState
    *  @param {string} match.params
   */
  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.resetState();
      this.fetchData(this.props.match.params.query);
    }
  } 

  /**
   * Render images to the DOM, mapping each element from search results.
   * If there is results from the search, it will render the image
   * Else will render NotFound component. 
   * @memberof App component
   * @return {string} - JSX element
   */
  render () {
    const data = this.state.images;
    let images;
    if(data.length > 0) {
      images = data.map( image => 
      <div className='img_list'>
        <Photo url={'http://localhost:8081/uploads/images/'+image.image} key={image.id}/>
        <div className='photo_icons'>
          <i class={"fa fa-star " +(image.featured == 1 ? "fav_icon_active": "")} onClick={() =>this.favouriteImage(image.id,(image.featured == 1 ? 0 : 1))}></i>
          <i class="fa fa-trash delete_icon" onClick={() =>this.deleteImage(image.id)}></i>
        </div>
        <div className='photo_content'>
          <h5>{image.file_original_name}</h5>
          <p>{moment(image.created_at).format("MMMM D, YYYY  h:mm:a")}</p>
        </div>
      </div>
      )
    } else if (!this.state.isLoading) {
      images = <NotFound />
    }

    return (
      <div className="photo-container">
        <h3 className='page_head'>{this.props.match.params.query ? 'Results of ' : ''} <span>{this.props.match.params.query}</span></h3>
        {this.state.isLoading ? <h3>Loading...</h3> : null}
        <div className='photos_grid'>
          {images}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
        </div>
      </div>
    )
  }
}