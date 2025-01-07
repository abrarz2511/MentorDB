import {useState, useEffect} from 'react';

interface ParticipantFormProps {
    onAdd?: (participant: any) => void;
    onEdit?: (participant: any) => void;
    onDelete?: (participant: any) => void;
    selectedParticipant?: any;
  }
  
  const ParticipantForm: React.FC<ParticipantFormProps> = ({
    onAdd,
    onEdit,
    onDelete,
    selectedParticipant,
  }) => {
    const [formData, setFormData] = useState({
      id: '',
      name: '',
    });
    
    useEffect(() => {
      if (selectedParticipant) {
        setFormData(selectedParticipant);
      }
      else {
        setFormData({id: '', name: '' });
      }
    }, [selectedParticipant])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (selectedParticipant && onEdit) {
        onEdit(formData);
      } else if (onAdd) {
        onAdd(formData);
      }
  
      setFormData({ id: '', name: '' });
    };
  
    const handleDelete = () => {
      if (selectedParticipant && onDelete) {
        onDelete(selectedParticipant);
      }
    };
    
      return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name        //Label is associated with the input field using the htmlFor attribute
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {selectedParticipant ? 'Update Participant' : 'Add Participant'}
            </button>
            {selectedParticipant && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Participant
              </button>
            )}
          </div>
        </form>
      );
};

export default ParticipantForm
