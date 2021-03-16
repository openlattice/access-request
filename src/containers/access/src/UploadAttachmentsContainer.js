// @flow
import { Component } from 'react';

import { Map } from 'immutable';
// $FlowFixMe
import { Button, List } from 'lattice-ui-kit';
import { ReduxUtils } from 'lattice-utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { UUID } from 'lattice';
import type { Dispatch } from 'redux';
import type { RequestSequence } from 'redux-reqseq';

import DocumentItem from './DocumentItem';
import FileUpload from './FileUpload';
import {
  UPLOAD_ATTACHMENTS,
  uploadAttachments
} from './actions';

import { moduleContext } from '../../../core/redux';
import { ACCESS, REQUEST_STATE } from '../../../core/redux/constants';

const { isPending } = ReduxUtils;

type Props = {
  accessRequestId :UUID;
  actions :{
    uploadAttachments :RequestSequence
  },
  loading :boolean;
};

type State = {
  files :Object[];
  tags :string[];
};

class UploadAttachmentsContainer extends Component<Props, State> {

  constructor(props :Props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    files: [],
    tags: [],
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

  onUpload = () => {
    const { accessRequestId, actions } = this.props;
    const { files, tags } = this.state;
    actions.uploadAttachments({
      files,
      tags,
      accessRequestId,
    });
  }

  render() {
    const { files } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <FileUpload onChange={this.onDrop} />
        <List>
          {
            files.map((file, index) => {
              const hasDivider = index !== files.length - 1;
              return (
                <DocumentItem
                    divider={hasDivider}
                    file={file}
                    index={index}
                    onDelete={this.onDelete}
                    onSelectTag={() => {}} />
              );
            })
          }
        </List>
        <Button
            color="primary"
            disabled={!files.length}
            fullWidth
            isLoading={loading}
            onClick={this.onUpload}>
          Upload
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state :Map) => ({
  loading: isPending(state.getIn([ACCESS, UPLOAD_ATTACHMENTS, REQUEST_STATE]))
});

const mapDispatchToProps = (dispatch :Dispatch<any>) => ({
  actions: bindActionCreators({
    uploadAttachments
  }, dispatch)
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { context: moduleContext }
)(UploadAttachmentsContainer);
