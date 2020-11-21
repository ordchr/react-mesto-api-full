import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export class EditProfilePopup extends React.Component {

  static contextType = CurrentUserContext;

  constructor (props) {
    super(props);

    this.props = props;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prevContext = null;

    this.state = {
      name: '',
      about: ''
    };
  }

  componentDidMount() {
    this.prevContext = this.context;
  }

  componentDidUpdate() {
    if (this.prevContext._id !== this.context._id) {
      this.setState({
        name: this.context.name,
        description: this.context.about
      });
      this.prevContext = this.context;
    }
  }

  handleInputChange (e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onUpdateUser({
      name: this.state.name,
      about: this.state.description
    });
  }

  render () {
    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="profile"
          isOpen={this.props.isOpen}
          onClose={this.props.onClose}
          onSubmit={this.handleSubmit}
        >
          <input id="popup-input-full-name" className="popup__input popup__input_full-name"
            name="name" type="text" placeholder="Имя пользователя"
            minLength="2" maxLength="40" required value={this.state.name || ''} onChange={this.handleInputChange}
          />
          <span id="popup-input-full-name-error" className="popup__input-error" />
          <input id="popup-input-profession" className="popup__input popup__input_profession"
            name="description" type="text" placeholder="Профессия"
            minLength="2" maxLength="200" required value={this.state.description || ''} onChange={this.handleInputChange}
          />
          <span id="popup-input-profession-error" className="popup__input-error" />
        </PopupWithForm>
    );
  }

}

// EditProfilePopup.contextType = CurrentUserContext;

export default EditProfilePopup;
