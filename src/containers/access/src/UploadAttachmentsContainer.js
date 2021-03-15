// @flow
import { Component } from 'react';

import { Map } from 'immutable';
import { List } from 'lattice-ui-kit';
import type { UUID } from 'lattice';

import FileUpload from './FileUpload';

import DocumentItem from '../DocumentItem';

type Props = {

};

type State = {
  files :Object[];
  tags :Map<UUID, string[]>;
};

class UploadAttachmentsContainer extends Component<Props, State> {

  constructor(props :Props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    files: [],
    tags: Map(),
  })

  onDrop = ({ file } :{ file :any }) => {
    const { files } = this.state;
    this.setState({ files: [...files, file] });
  }

  onDelete = (index :number) => {
    const { files } = this.state;
    files.splice(index, 1);
    this.setState({ files });
  };

  render() {
    const { files } = this.state;
    return (
      <div>
        <FileUpload onChange={this.onDrop} />
        <List>
          {
            files.map((file, index) => (
              <DocumentItem
                  file={file}
                  index={index}
                  onDelete={this.onDelete}
                  onSelectTag={() => {}} />
            ))
          }
        </List>
      </div>
    );
  }
}

export default UploadAttachmentsContainer;
