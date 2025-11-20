'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar } from './calendar';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  id?: string;
}

export function DatePicker(props: DatePickerProps) {
  const { value, onChange, id } = props;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="w-48 justify-between font-normal">
          {value ? dayjs(value).format('DD/MM/YYYY') : 'Selecione uma data'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          {...props}
          mode="single"
          id={id}
          captionLayout="dropdown"
          selected={value ? dayjs(value).toDate() : undefined}
          onSelect={(selected) => {
            setOpen(false);
            onChange(dayjs(selected).toISOString());
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
