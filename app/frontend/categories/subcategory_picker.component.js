import { Component, PropTypes } from 'react';

export default class SubcategoryPicker extends Component {
  subcategories () {
    var categoryId = this.props.categoryId;
    var subcategories = this.props.subcategories.filter( (subcategory) =>
      subcategory.categoryId === categoryId
    );

    var selectedId = this.props.selectedId;
    var component = this;

    return subcategories.map( function(subcategory){
      var selected = subcategory.id === selectedId;

      var classNames = ['subcategory-' + subcategory.id];
      if(selected){ classNames.push('selected'); }

      return (
        <li className={classNames.join(' ')}
            key={subcategory.id}
            onClick={() => component.select(subcategory)}>
          <span className="name">{subcategory.name} <a href={`/categories#subcategory_${subcategory.id}`} target="_blank"> <i className="fa fa-info-circle"></i></a></span>
        </li>
      );
    });
  }

  render () {
    return (
      <div className="subcategory-picker">
        <label>{I18n.t("components.category_picker.subcategory.label")}</label>
        <ul>
          {this.subcategories()}
        </ul>
      </div>
    );
  }

  select (subcategory) {
    if (this.props.onSelect) {
      this.props.onSelect(subcategory)
    }
  }
}

SubcategoryPicker.propTypes = {
  categoryId: PropTypes.string.isRequired,
  subcategories: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};
