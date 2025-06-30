import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { CoachingNoteCard } from '../../src/app/patients/[patientId]/_ui/_components/CoachingNoteCard';
import { PatientsContextProvider } from '@/app/patients/context';


// Helper to wrap components with the provider
const customRender = (component: React.ReactElement) => {
  return render(component, { wrapper: PatientsContextProvider });
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

    customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('This is a test note')).toBeInTheDocument();
    expect(screen.getByText('10/1/2025')).toBeInTheDocument();
    // Use a regular expression to be more flexible with the time format
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

    customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

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

    customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

    expect(screen.getByText('A'.repeat(500))).toBeInTheDocument();
    expect(screen.getAllByText('10/1/2025')).toHaveLength(1);
    expect(screen.getByText(/10:30:00/)).toBeInTheDocument();
  });

  describe('Action Menu', () => {
    it('renders the action menu button', () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'This is a test note',
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

      const actionButton = screen.getByRole('button');
      expect(actionButton).toBeInTheDocument();
    });

    it('opens dropdown menu when action button is clicked', async () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'This is a test note',
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

      const actionButton = screen.getByRole('button');
      fireEvent.click(actionButton);

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
      });
    });
  });

  describe('Date and Time Formatting', () => {
    it('formats date correctly for different dates', () => {
      const testCases = [
        {
          date: new Date('2025-01-15T14:30:00'),
          expectedDate: '1/15/2025',
          expectedTime: /2:30:00/,
        },
        {
          date: new Date('2025-12-31T23:59:59'),
          expectedDate: '12/31/2025',
          expectedTime: /11:59:59/,
        },
      ];

      testCases.forEach(({ date, expectedDate, expectedTime }) => {
        const mockCoachingNote = {
          id: 'note1',
          patientId: 'some patient id',
          note: 'Test note',
          updatedAt: date,
          createdAt: date,
        };

        const { unmount } = customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

        expect(screen.getByText(expectedDate)).toBeInTheDocument();
        expect(screen.getByText(expectedTime)).toBeInTheDocument();

        unmount();
      });
    });

    it('handles different timezones correctly', () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'Test note',
        updatedAt: new Date('2025-10-01T10:30:00Z'), // UTC time
        createdAt: new Date('2025-10-01T10:30:00Z'),
      };

      customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

      // Verify that the date is rendered (exact format may vary depending on local timezone)
      expect(screen.getByText(/2025/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'This is a test note',
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

      const actionButton = screen.getByRole('button');
      expect(actionButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('is keyboard navigable', () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'This is a test note',
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

      const actionButton = screen.getByRole('button');
      actionButton.focus();
      expect(actionButton).toHaveFocus();
    });
  });

  describe('Props and Styling', () => {
    it('accepts and applies custom className', () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'This is a test note',
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      const { container } = customRender(
        <CoachingNoteCard coachingNote={mockCoachingNote} className="custom-class" />
      );

      const card = container.firstChild;
      expect(card).toHaveClass('custom-class');
    });

    it('forwards additional props to the Card component', () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'This is a test note',
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      const { container } = customRender(
        <CoachingNoteCard 
          coachingNote={mockCoachingNote} 
          data-testid="coaching-note-card"
        />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'coaching-note-card');
    });
  });

  describe('Edge Cases', () => {
    it('handles extremely long notes gracefully', () => {
      const veryLongNote = 'A'.repeat(10000);
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: veryLongNote,
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

      expect(screen.getByText(veryLongNote)).toBeInTheDocument();
    });

    it('handles special characters in notes', () => {
      const specialNote = 'Note with émojis 🔥 and special chars: < > & " \'';
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: specialNote,
        updatedAt: new Date('2025-10-01T10:30:00'),
        createdAt: new Date('2025-10-01T10:30:00'),
      };

      customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);

      expect(screen.getByText(specialNote)).toBeInTheDocument();
    });

    it('handles invalid date objects', () => {
      const mockCoachingNote = {
        id: 'note1',
        patientId: 'some patient id',
        note: 'Test note',
        updatedAt: new Date('invalid-date'),
        createdAt: new Date('invalid-date'),
      };

      // This should not explode, although the date format may be strange
      expect(() => {
        customRender(<CoachingNoteCard coachingNote={mockCoachingNote} />);
      }).not.toThrow();
    });
  });
});
