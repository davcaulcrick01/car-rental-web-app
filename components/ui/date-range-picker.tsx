// components/ui/date-range-picker.tsx
export const DateRangePicker = ({
    from,
    to,
    onSelect,
  }: {
    from: Date | null;
    to: Date | null;
    onSelect: (range: { from: Date | null; to: Date | null }) => void;
  }) => {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="date"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={from ? from.toISOString().split('T')[0] : ''}
            onChange={(e) =>
              onSelect({ from: e.target.value ? new Date(e.target.value) : null, to })
            }
            min={new Date().toISOString().split('T')[0]}
            placeholder="Start date"
          />
          <span className="absolute text-gray-500 text-sm -top-6 left-0">From</span>
        </div>

        <div className="relative">
          <input
            type="date"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={to ? to.toISOString().split('T')[0] : ''}
            onChange={(e) =>
              onSelect({ from, to: e.target.value ? new Date(e.target.value) : null })
            }
            min={from ? from.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            placeholder="End date"
          />
          <span className="absolute text-gray-500 text-sm -top-6 left-0">To</span>
        </div>
      </div>
    );
  };
