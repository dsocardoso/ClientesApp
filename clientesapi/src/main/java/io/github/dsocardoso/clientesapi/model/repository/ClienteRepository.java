package io.github.dsocardoso.clientesapi.model.repository;

import io.github.dsocardoso.clientesapi.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

}
