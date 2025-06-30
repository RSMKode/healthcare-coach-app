import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { CoachingNoteCard } from '../../src/app/patients/[patientId]/_ui/_components/CoachingNoteCard';
import { PatientsContextProvider } from '@/app/patients/context';

// Helper para envolver componentes con el provider
const renderWithContextProvider = (component: React.ReactElement) => {
  return render(
    <PatientsContextProvider>
      {component}
    </PatientsContextProvider>
  );
};

describe('CoachingNoteCard', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the coaching note content and updated date/time', () => {
    const mockCoachingNote = {
      id: 'note1',
      patientId: 'some patient id',
      note: 'This is a test note',
      updatedAt: new Date('2025-10-01T10:30:00'),
      createdAt: new Date('2025-10-01T10:30:00'),
    };

    renderWithContextProvider(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('This is a test note')).toBeInTheDocument();
    expect(screen.getByText('10/1/2025')).toBeInTheDocument();
    // Usamos una expresión regular para ser más flexible con el formato de hora
    expect(screen.getByText(/10:30:00/)).toBeInTheDocument();
  });

  it('renders correctly when note is empty', () => {
    const mockCoachingNote = {
      id: 'note2',
      patientId: 'some patient id',
      note: '',
      createdAt: new Date('2025-10-01T10:30:00'),
      updatedAt: new Date('2025-10-01T10:30:00'),
    };

    renderWithContextProvider(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('10/1/2025')).toBeInTheDocument();
    expect(screen.getByText(/10:30:00/)).toBeInTheDocument();
  });

  it('renders correctly with long note content', () => {
    const mockCoachingNote = {
      id: 'note3',
      patientId: 'some patient id',
      note: 'A'.repeat(500), // Long note content
      createdAt: new Date('2025-10-01T10:30:00'),
      updatedAt: new Date('2025-10-01T10:30:00'),
    };

    renderWithContextProvider(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('A'.repeat(500))).toBeInTheDocument();
    expect(screen.getAllByText('10/1/2025')).toHaveLength(1);
    expect(screen.getByText(/10:30:00/)).toBeInTheDocument();
  });
});
