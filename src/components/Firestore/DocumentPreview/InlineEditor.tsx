/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import './InlineEditor.scss';

import {
  Card,
  CardActionButton,
  CardActionButtons,
  CardActions,
} from '@rmwc/card';
import { Elevation } from '@rmwc/elevation';
import React, { useState } from 'react';

import DocumentEditor from '../DocumentEditor';
import { FirestoreAny, FirestoreMap } from '../models';

/** Editor entry point for a selected field */
const InlineEditor: React.FC<{
  value: FirestoreMap;
  onCancel: () => void;
  onSave: (key: string, value: FirestoreAny) => void;
  areRootKeysMutable: boolean;
  rtdb?: boolean;
}> = ({ value, onCancel, onSave, areRootKeysMutable, rtdb }) => {
  const [internalValue, setInternalValue] = useState<
    FirestoreMap | undefined
  >();

  function handleChange(value: FirestoreMap | undefined) {
    setInternalValue(value);
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    onCancel();
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (internalValue) {
      onSave(Object.keys(internalValue)[0], Object.values(internalValue)[0]);
    }
  }

  return (
    <Elevation z={8} wrap>
      <Card className="Firestore-InlineEditor">
        <div className="Firestore-InlineEditorContent">
          <DocumentEditor
            value={value}
            onChange={handleChange}
            areRootNamesMutable={areRootKeysMutable}
            areRootFieldsMutable={false}
            rtdb={rtdb}
          />
        </div>
        <CardActions className="Firestore-InlineEditorActions">
          <CardActionButtons>
            <CardActionButton onClick={handleCancel}>Cancel</CardActionButton>
            <CardActionButton
              unelevated
              onClick={handleSubmit}
              disabled={!internalValue}
            >
              Save
            </CardActionButton>
          </CardActionButtons>
        </CardActions>
      </Card>
    </Elevation>
  );
};

export default InlineEditor;
