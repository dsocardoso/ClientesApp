package io.github.dsocardoso.clientesapi.controller;

import io.github.dsocardoso.clientesapi.controller.dto.ServicoPrestadoDTO;
import io.github.dsocardoso.clientesapi.model.entity.Cliente;
import io.github.dsocardoso.clientesapi.model.entity.ServicoPrestado;
import io.github.dsocardoso.clientesapi.model.repository.ClienteRepository;
import io.github.dsocardoso.clientesapi.model.repository.ServicoPrestadoRepository;
import io.github.dsocardoso.clientesapi.util.BigDecimalConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("api/servicos-prestados")
public class ServicoPrestadoController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ServicoPrestadoRepository repository;

    @Autowired
    private BigDecimalConverter bigDecimalConverter;


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado salvar(@RequestBody ServicoPrestadoDTO dto) {
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Integer idCliente = dto.getIdCliente();

        Cliente cliente = clienteRepository
                .findById(idCliente)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente Inexistente"));

        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setData(data);
        servicoPrestado.setCliente(cliente);
        servicoPrestado.setValor(bigDecimalConverter.converter(dto.getPreco()));
        return repository.save(servicoPrestado);
    }

    @GetMapping
    public List<ServicoPrestado> pesquisar(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @RequestParam(value = "mes", required = false) Integer mes) {

        return repository.findByNomeAndMes("%" + nome + "%", mes);
    }
}
