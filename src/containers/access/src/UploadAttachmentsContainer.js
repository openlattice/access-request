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
import type { RequestSequence, RequestState } from 'redux-reqseq';

import DocumentItem from './DocumentItem';
import FileUpload from './FileUpload';
import {
  UPLOAD_ATTACHMENTS,
  uploadAttachments
} from './actions';

import { moduleContext } from '../../../core/redux';
import { resetRequestState } from '../../../core/redux/actions';
import { ACCESS, REQUEST_STATE } from '../../../core/redux/constants';

const { isSuccess, isPending } = ReduxUtils;

type Props = {
  accessRequestId :UUID;
  actions :{
    uploadAttachments :RequestSequence;
    resetRequestState :RequestSequence;
  },
  requestState :RequestState;
  onSuccess :() => void;
};

type State = {
  files :Object[];
  tags :string[];
};

class UploadAttachmentsContainer extends Component<Props, State> {

  constructor(props :Props) {
    super(props);
    this.state = {
      files: [],
      tags: [],
    };
  }

  componentDidUpdate() {
    const { requestState, onSuccess } = this.props;
    if (isSuccess(requestState)) {
      onSuccess();
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetRequestState([UPLOAD_ATTACHMENTS]);
  }

  onDrop = ({ file } :{ file :any }) => {
    const { files } = this.state;
    this.setState({ files: [...files, file] });
  }

  onDelete = (index :number) => {
    const { files, tags } = this.state;
    const newFiles = Array.from(files);
    const newTags = Array.from(tags);
    newFiles.splice(index, 1);
    newTags.splice(index, 1);
    this.setState({ files: newFiles, tags: newTags });
  };

  onTagChange = (index :number, value :string) => {
    const { tags } = this.state;
    const newTags = Array.from(tags);
    newTags[index] = value;
    this.setState({ tags: newTags });
  };

  onUpload = () => {
    const { accessRequestId, actions } = this.props;
    const { files, tags } = this.state;
    actions.uploadAttachments({
      accessRequestId,
      files,
      tags,
    });
  }

  render() {
    const { files, tags } = this.state;
    const { requestState } = this.props;
    return (
      <div>
        <FileUpload onChange={this.onDrop} />
        <List>
          {
            files.map((file, index) => {
              const hasDivider = index !== files.length - 1;
              return (
                <DocumentItem
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={`document-${index}`}
                    divider={hasDivider}
                    file={file}
                    index={index}
                    onDelete={this.onDelete}
                    onTagChange={this.onTagChange}
                    tag={tags[index]} />
              );
            })
          }
        </List>
        <Button
            color="primary"
            disabled={!files.length}
            fullWidth
            isLoading={isPending(requestState)}
            onClick={this.onUpload}>
          Upload
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state :Map) => ({
  requestState: state.getIn([ACCESS, UPLOAD_ATTACHMENTS, REQUEST_STATE])
});

const mapDispatchToProps = (dispatch :Dispatch<any>) => ({
  actions: bindActionCreators({
    resetRequestState,
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
