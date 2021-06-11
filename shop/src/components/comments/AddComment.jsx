import { Form, Row, Col, Alert } from 'react-bootstrap';
import { Component } from 'react';
import '../../styles/css/commentArea.css';

class AddComment extends Component {
  state = {
    review: {
      comment: '',
      rate: 1,
      productId: this.props.productId,
    },
    showSuccess: false,
  };

  // handleCommentUpdate = (e) => {
  //   this.props.onCommentUpdate(e);
  // };

  // handleNewCommentSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.onNewCommentSubmit(true);
  // };

  handleChange(e) {
    this.setState({
      ...this.state,
      review: {
        ...this.state.review,
        [e.target.id]: e.target.value,
      },
    });
  }

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.newComment !== this.props.newComment) {
  //     try {
  //       let response = await fetch(this.state.url, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(this.props.currComment),
  //       });
  //       if (response.ok) {
  //          this.props.onNewCommentSubmit(true);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // putComment = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(this.state.url + this.props.productId, {
  //       method: 'PUT',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify(this.props.newComment),
  //     });
  //     if (!res.ok) throw 'something went wrong';
  //     this.props.onNewCommentSubmit(true);
  //   } catch (error) {}
  // };

  postComment = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/reviews`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(this.state.review),
      });
      console.log(res);
      if (!res.ok) {
        console.log('error while adding a new comment');
      } else {
        this.setState({ showSuccess: true });
        let data = await res.json();
        console.log(data);
      }
      // this.props.onNewCommentSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.showSuccess === true) {
      return (
        <Alert
          className="alert-success-product"
          style={{ marginTop: '150px' }}
          variant="success"
          onClose={() => {
            this.setState({ ...this.state, showSuccess: false });
            // this.props.history.push('/LatestReleases');
          }}
          dismissible
        >
          <Alert.Heading>Your review has been sucesfully added</Alert.Heading>
          <p>Close this window to get re-directed to the main page</p>
        </Alert>
      );
    } else {
      return (
        <>
          <h6 className="mt-3">Add Comments</h6>
          {/* {this.state.saveSuccess && (
          <Alert
            variant="success"
            className="position-absolute"
            style={{
              top: 0,
            }}
          >
            Your comment got added
          </Alert>
        )} */}
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="reviews-rating">
                  <Form.Label>Your rating</Form.Label>
                  <Form.Control
                    className="inputs"
                    as="textarea"
                    id="rating"
                    rows={1}
                    value={this.state.review.rating}
                    onChange={(e) => this.handleChange(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="reviews-comment" className="inputs">
                  <Form.Label>Your comment</Form.Label>
                  <Form.Control
                    id="comment"
                    as="textarea"
                    rows={1}
                    value={this.state.review.comment}
                    onChange={(e) => this.handleChange(e)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row></Row>
            {/* <button
            type='button'
            onClick={(e) => this.postComment(e)}
            className='backoffice-editbtn btn btn-light float-right mx-1'>
            <ion-icon name='create-outline' />
          </button> */}
            <button
              type="button"
              className="btn btn-dark add-comment"
              onClick={(e) => {
                this.postComment(e);
                this.setState({ showSuccess: true });
              }}
            >
              {' '}
              Add your review
            </button>
          </Form>
        </>
      );
    }
  }
}

export default AddComment;
