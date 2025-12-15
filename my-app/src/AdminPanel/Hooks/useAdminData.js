import { useEffect, useState } from "react";
import axios from "axios";

export default function useAdminData() {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const [u, m, i] = await Promise.all([
        axios.get("http://localhost:8080/get-all"),
        axios.get("http://localhost:8080/"),
        axios.get("http://localhost:8080/GetAllImage")
      ]);

      setUsers(u.data);
      setMatches(m.data);
      setImages(i.data);
      setLoading(false);
    }

    fetchAll();
  }, []);

  return { users, matches, images, loading };
}
