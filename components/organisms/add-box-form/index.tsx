import React, { useEffect, useState, useId } from 'react';
import { useFormik, FormikProps, FormikValues } from 'formik';
import * as yup from 'yup';

// Import components
import { Button, Card, InputFactory } from 'components';

// Import helpers
import { handleFormValidation } from 'lib/helpers';

// Import Types
import type { InputValue } from 'lib/types/input-value';
import { Room } from 'lib/types/room';
import { Box } from 'lib/types/box';

type AutoData = {
  boxNumber: number;
  currentLocationID: string;
  sourceID: string;
  destinationID: string;
  creatorID: string;
};

interface Props extends React.ComponentProps<'form'> {
  /**
   * The rooms array
   */
  rooms: Room[];
  /**
   * The data to populate the box with
   */
  boxAutoData: AutoData;
  /**
   * The function to use to add a box
   */
  onAddBox: (data: Box) => void;
}

export interface AddBoxFormData {
  room: InputValue;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const validationSchema = yup.object().shape({
  room: yup.string().required()
});

/**
 * The Add box form Component
 */
export const AddBoxForm: React.FC<Props> = ({
  rooms = [],
  boxAutoData = {} as AutoData,
  onAddBox,
  className,
  ...props
}: Props) => {
  const formik = useFormik({
    initialValues: {
      room: ''
    },
    validationSchema,
    onSubmit: (values: Partial<AddBoxFormData>) => {
      const boxDetails = {
        ...boxAutoData,
        uuid: crypto.randomUUID(),
        room: rooms.find((room) => room.uuid === values.room),
        percentFilled: 0,
        sealed: false,
        contents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Box;

      onAddBox(boxDetails);
    }
  }) as unknown as FormikProps<FormikValues>;

  const formId = `${useId()}-form`;
  const roomId = `${useId()}-room`;

  return (
    <form
      className={`${styles['add-box-form']} ${className}`}
      id={formId}
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <InputFactory
        id={roomId}
        labelText="Which room would you like to add the box to?"
        type="select"
        placeholder="Select a room..."
        options={rooms.map((room: Room) => ({
          value: room.uuid,
          label: room.name
        }))}
        {...formik.getFieldProps('room')}
        {...handleFormValidation(formik, 'room')}
      />
      <Button type="submit" label="Add Box" />
      <Button variant="text" label="Cancel" />
    </form>
  );
};

export default AddBoxForm;
export type { Props };
