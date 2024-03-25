import { Component } from 'react';

export class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    if (this.controller) {
      this.controller.abort();
    }
  }

  async fetchData() {
    this.setState({ isLoading: true });
    this.controller = new AbortController();
    const signal = this.controller.signal;

    try {
      const response = await fetch(this.props.apiUrl, { signal });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      this.setState({ data: data, isLoading: false });
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.setState({ error, isLoading: false });
      }
    } finally {
      this.controller = null;
    }
  }

  render() {
    const { data, error, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return (
      // renders data
    );
  }
}
