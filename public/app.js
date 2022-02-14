const Products = [];

class ProductTable extends React.Component {
  render() {
    const productRows = this.props.products.map(product => React.createElement(ProductRow, {
      key: product.id,
      product: product
    }));
    return React.createElement("table", {
      className: "table table-striped"
    }, React.createElement("tr", {
      className: "table-dark"
    }, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image")), React.createElement("tbody", null, productRows));
  }

}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    return React.createElement("tr", {
      className: "table-dark"
    }, React.createElement("td", null, product.productName), React.createElement("td", null, "$", product.productPrice), React.createElement("td", null, product.productCategory), React.createElement("td", null, React.createElement("a", {
      href: product.productImage,
      target: "_blank"
    }, "View")));
  }

}

class AddProduct extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    var price = form.prdPrice.value;
    price = price.slice(1);
    const product = {
      productName: form.prdName.value,
      productPrice: price,
      productCategory: form.prdCat.value,
      productImage: form.prdImg.value
    };
    this.props.createProduct(product);
    form.prdName.value = "";
    form.prdPrice.value = "$";
    form.prdImg.value = "";
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      name: "productAdd",
      className: "formAdd",
      onSubmit: this.handleSubmit
    }, React.createElement("div", null, React.createElement("p", null, React.createElement("label", null, "Category", React.createElement("br", null), React.createElement("select", {
      id: "prdCat",
      name: "category"
    }, React.createElement("option", {
      value: "shirts"
    }, "Shirts"), React.createElement("option", {
      value: "jeans"
    }, "Jeans"), React.createElement("option", {
      value: "jackets"
    }, "Jackets"), React.createElement("option", {
      value: "sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "accessories"
    }, "Accessories")))), React.createElement("p", null, React.createElement("label", null, "Price Per Unit", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "prdPrice",
      defaultValue: "$"
    }))), React.createElement("p", null, React.createElement("input", {
      type: "submit",
      id: "btnAdd",
      value: "Add Product"
    }))), React.createElement("div", null, React.createElement("p", null, React.createElement("label", null, "Product Name", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "prdName"
    }))), React.createElement("p", null, React.createElement("label", null, "Image URL", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "prdImg"
    }))))));
  }

}

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        products: Products
      });
    }, 500);
  }

  createProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({
      products: newProductList
    });
  }

  render() {
    return React.createElement("div", {
      className: "container jumbotron"
    }, React.createElement("h1", null, "Inventory"), React.createElement("h3", null, "Showing all availble products"), React.createElement("br", null), React.createElement("hr", null), React.createElement("br", null), React.createElement(ProductTable, {
      products: this.state.products
    }), " ", React.createElement("br", null), React.createElement("h3", null, "Add a new product to inventory"), React.createElement("hr", null), React.createElement(AddProduct, {
      createProduct: this.createProduct
    }));
  }

}

ReactDOM.render(React.createElement(Product, null), document.getElementById('section1'));