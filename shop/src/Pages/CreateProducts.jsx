import React, { Component } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../styles/css/createProduct.css';

export class CreateProducts extends Component {
  state = {
    formData: [],
    product: {},
    url: 'http://localhost:3001/products/',
    loading: true,
    showSuccess: false,
    showDelete: false,
    showUpdate: false,
  };

  handleFileChange = (e) => {
    const formData = new FormData();

    if (e.target.files[0]) {
      formData.append('cover', e.target.files[0]);
      this.setState((state) => {
        return { formData: formData };
      });
    }
  };
  handleChange(e) {
    this.setState({
      ...this.state,
      product: {
        ...this.state.product,
        [e.target.id]: e.target.value,
      },
    });
  }

  // fileUpload = async (id) => {
  //   try {
  //     const res = await fetch(this.state.url + `${id}/upload`, {
  //       method: 'POST',
  //       body: this.state.formData,
  //     });
  //     if (res.ok) {
  //       const upload = await res;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  postProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(this.state.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(this.state.product),
      });
      if (res.ok) {
        this.setState({ ...this.state, showSuccess: true });

        let data = await res.json();

        console.log(data);
      } else {
        console.log('Something went wrong');
        // this.fileUpload(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProduct = async () => {
    try {
      const res = await fetch(this.state.url + this.props.match.params.id);
      console.log(res);
      if (!res.ok) {
        console.log('Something wen wrong');
      }
      const data = await res.json();
      this.setState((state) => {
        return { product: data, loading: false };
      });
    } catch (error) {
      console.log(error);
    }
  };

  putProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(this.state.url + this.props.match.params.id, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(this.state.product),
      });
      if (!res.ok) {
        console.log('Something went wrong');
      } else {
        let data = await res.json();
        console.log(data);
        // this.fileUpload(data.id);
      }
    } catch (error) {}
  };

  deleteProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(this.state.url + this.props.match.params.id, {
        method: 'DELETE',
      });
      if (res.ok) {
        let data = await res.json();

        this.setState({ ...this.state, showDelete: true });
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {}
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getProduct();
    } else {
      this.setState((state) => {
        return { loading: false };
      });
    }
  }

  render() {
    if (this.state.showSuccess) {
      return (
        <Alert
          className="alert-success-product"
          style={{ marginTop: '150px' }}
          variant="success"
          onClose={() => {
            this.setState({ ...this.state, showSuccess: false });
            this.props.history.push('/LatestReleases');
          }}
          dismissible
        >
          <Alert.Heading>Your product has been sucesfully added</Alert.Heading>
          <p>Close this window to get re-directed to the main page</p>
        </Alert>
      );
    } else if (this.state.showDelete) {
      return (
        <Alert
          className="alert-success-product"
          style={{ marginTop: '150px' }}
          variant="danger"
          onClose={() => {
            this.setState({ ...this.state, showDelete: false });
            this.props.history.push('/LatestReleases');
          }}
          dismissible
        >
          <Alert.Heading>
            Your product has been sucesfully deleted
          </Alert.Heading>
          <p>Close this window to get re-directed to the main page</p>
        </Alert>
      );
    } else if (this.state.showUpdate) {
      return (
        <Alert
          className="alert-success-product"
          style={{ marginTop: '150px' }}
          variant="warning"
          onClose={() => {
            this.setState({ ...this.state, showUpdate: false });
            this.props.history.push('/LatestReleases');
          }}
          dismissible
        >
          <Alert.Heading>
            Your product has been sucesfully updated
          </Alert.Heading>
          <p>Close this window to get re-directed to the main page</p>
        </Alert>
      );
    } else {
      return (
        <div
          className="container-md main-create-product"
          style={{ marginTop: '125px' }}
        >
          <div className="row mt-2 d-flex justify-content-center">
            <h1>Add products</h1>
          </div>
          <div className="row d-flex justify-content-center">
            <form className="product-form w-50">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.product.name}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Name of the product"
                  required
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={this.state.product.description}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Description"
                  required
                />
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={this.state.product.brand}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="brand name"
                  required
                />
                <label htmlFor="brand">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={this.state.product.category}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="category"
                  required
                />
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  value={this.state.product.imageUrl}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Url"
                  required
                />
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={this.state.product.price}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="price in Euro"
                  required
                />
                <Form.File
                  id="custom-picture"
                  label="Cover"
                  onChange={(e) => this.handleFileChange(e)}
                />
              </div>
              {!this.props.match.params.hasOwnProperty('id') && (
                <button
                  type="button"
                  className="btn btn-primary float-right"
                  onClick={(e) => {
                    this.postProduct(e);
                    this.setState({ ...this.state, showSuccess: true });
                  }}
                >
                  Add new product
                </button>
              )}
              {this.props.match.params.hasOwnProperty('id') && (
                <button
                  type="button"
                  className="backoffice-delbtn btn btn-danger float-right mx-1"
                  onClick={(e) => {
                    this.deleteProduct(e);
                    this.setState({ ...this.state, showDelete: true });
                  }}
                >
                  Delete product
                </button>
              )}
              {this.props.match.params.hasOwnProperty('id') && (
                <button
                  type="button"
                  className="backoffice-editbtn btn btn-light float-right mx-1"
                  onClick={(e) => {
                    this.putProduct(e);
                    this.setState({ ...this.state, showUpdate: true });
                  }}
                >
                  Edit your product
                </button>
              )}
            </form>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(CreateProducts);
