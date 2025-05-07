import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CoachingNoteCard } from '../../src/app/patients/[patientId]/_ui/_components/CoachingNoteCard';

describe('CoachingNoteCard', () => {
  it('renders the coaching note content and updated date/time', () => {
    const mockCoachingNote = {
      id: 'note1',
      patientId: 'some patient id',
      note: 'This is a test note',
      updatedAt: new Date('2025-10-01T10:30:00Z'),
      createdAt: new Date('2025-10-01T10:30:00Z'),
    };

    render(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('This is a test note')).toBeInTheDocument();
    expect(screen.getByText('10/1/2025')).toBeInTheDocument();
    expect(screen.getByText('10:30:00 AM')).toBeInTheDocument();
  });

  it('renders correctly when note is empty', () => {
    const mockCoachingNote = {
      id: 'note2',
      patientId: 'some patient id',
      note: '',
      createdAt: new Date('2025-10-01T10:30:00Z'),
      updatedAt: new Date('2025-10-01T10:30:00Z'),
    };

    render(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('No content available')).toBeInTheDocument(); // Assuming a fallback message
    expect(screen.getByText('10/1/2025')).toBeInTheDocument();
    expect(screen.getByText('10:30:00 AM')).toBeInTheDocument();
  });

  it('renders correctly with long note content', () => {
    const mockCoachingNote = {
      id: 'note3',
      patientId: 'some patient id',
      note: 'A'.repeat(500), // Long note content
      createdAt: new Date('2025-10-01T10:30:00Z'),
      updatedAt: new Date('2025-10-01T10:30:00Z'),
    };

    render(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('A'.repeat(500))).toBeInTheDocument();
    expect(screen.getByText('10/1/2025')).toBeInTheDocument();
    expect(screen.getByText('10:30:00 AM')).toBeInTheDocument();
  });
});
