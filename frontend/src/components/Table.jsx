import { useEffect, useState } from 'react';
import InfoLot from '../components/InfoLot';
import SearchBar from './SearchBar';
import CommissionModal from './CommissionModal';
import ButtonsTable from './ButtonsTable';
import RegisterLot from './RegisterLot';
import Alert from './Alert';

const Table = () => {
    const [lotes, setLotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openCommission, setOpenCommission] = useState(false);
    const [openModalRegister, setOpenModalRegister] = useState(false);

    const [detalleLote, setDetalleLote] = useState([]);
    const [updateCommission, setUpdateCommission] = useState(false);
    
    const listarLotes = async () => {
      try {
          const response = await fetch('http://localhost:3000/api/lotes');
          if (!response.ok) {
             throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setLotes(data);
      } catch (error) {
          setError(error.message);
      } finally {
          setLoading(false);
      }
  };

    const consultarDetalleLotes = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/lotes/${id}`);
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            data['id'] = id;
            setDetalleLote(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listarLotes();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    const handleClick = async (id) => {
        if(open){
            setOpen(false)
        }else{
            await consultarDetalleLotes(id)
            setOpen(true)
        }
    }

    return (
    <>
      <Alert 
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        open={open} 
        setOpen={setOpen}
        setError={setError}
        setSuccess={setSuccess}
        detalleLote={detalleLote} 
        listarLotes={listarLotes}
      />
      {error ? 
      <div className="absolute right-8 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Error! </span>{error}
        </div>
      </div>
      : ''}
      {success ?
      <div className="absolute right-8 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Exito! </span>{success}
        </div>
      </div>
      : ''}
      <SearchBar lotes={lotes} setLotes={setLotes} />
      <InfoLot 
      open={open} 
      setOpen={setOpen}
      openAlert={openAlert}
      setOpenAlert={setOpenAlert}
      openCommission={openCommission}
      setOpenCommission={setOpenCommission}
      detalleLote={detalleLote} 
      setDetalleLote={setDetalleLote} 
      lotes={lotes} 
      setLotes={setLotes} 
      listarLotes={listarLotes}
      type={''}
      />
      <RegisterLot
      openModalRegister={openModalRegister} 
      setOpenModalRegister={setOpenModalRegister}
      listarLotes={listarLotes}
      />
      <CommissionModal 
      open={open} 
      setOpen={setOpen} 
      openCommission={openCommission}
      setOpenCommission={setOpenCommission}
      detalleLote={detalleLote} 
      listarLotes={listarLotes}
      updateCommission={updateCommission}
      setUpdateCommission ={setUpdateCommission}
      />
      <div className="flex flex-col items-center overflow-x-auto max-h-[70vh]">
        <div className="inline-block w-[90vw] overflow-x-auto">        
          <table className="min-w-full  text-sm font-light" >
            <thead className={`border-b border-neutral-200 font-medium bg-slate-100 sticky top-0`} >
              <tr>
                <th className="px-6 py-2 sticky top-0">NOMBRE CLIENTE</th>
                <th className="px-6 py-2 sticky top-0">VENDEDOR</th>
                <th className="px-6 py-2 sticky top-0">ETAPA</th>
                <th className="px-6 py-2 sticky top-0">M</th>
                <th className="px-6 py-2 sticky top-0">L</th>
                <th className="px-6 py-2 sticky top-0">VALOR VENTA</th>
                <th className="px-6 py-2 sticky top-0">VALOR TOTAL RECIBIDO</th>
                <th className="px-6 py-2 sticky top-0">VALOR COMISIÓN</th>
                <th className="px-6 py-2 sticky top-0">ABONO COMISIÓN</th>
                <th className="px-6 py-2 sticky top-0">FECHA ÚLTIMO ABONO</th>
                <th className="px-6 py-2 sticky top-0">SALDO POR PAGAR</th>
                <th className="px-6 py-2 sticky top-0">ESTADO COMISIÓN</th>
                <th className="px-6 py-2 sticky top-0">TIPO CONDICIÓN</th>
              </tr>
            </thead>
            <tbody className='divide-y text-center'>
              {lotes.map((lote) => (
                <tr className="border-b border-neutral-20 hover:bg-gray-300 hover:cursor-pointer" key={lote._id} id={lote._id} onClick={() => handleClick(lote._id)}>
                  <td className="whitespace-nowrap px-6 py-4">{lote.nombre_cliente}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.vendedor}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.etapa}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.manzana}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.lote}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.valor_venta}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.valor_total_recibido}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.valor_comision}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.abono_comision}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.fecha_ultimo_abono}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.saldo_por_pagar}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.estado_comision}</td>
                  <td className="whitespace-nowrap px-6 py-4">{lote.condicion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ButtonsTable 
      openModalRegister= {openModalRegister}
      setOpenModalRegister = {setOpenModalRegister}
      setError={setError}
      setSuccess={setSuccess}
      updateCommission={updateCommission}
      setUpdateCommission ={setUpdateCommission}
      listarLotes={listarLotes}
      />
      
    </>
  );
};

export default Table;
